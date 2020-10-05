/* eslint-disable eqeqeq */
import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import dateFormat from 'dateformat';
import async from 'async';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';
import Product from '../../models/Product';

export const addTransactionSchema = Joi.object().keys({
  sellerid: Joi.string().required(),
  buyeremail: Joi.string().email(),
  price: Joi.number().required(),
  products: Joi.array()
});

const add: RequestHandler = async (req, res) => {
  const {
    sellerid, price, buyeremail, products
  } = req.body;
  const bought = new Set(products);
  const tasks = [
    (cb: any) => {
      let flag: number = 0;
      let noCount: number = 0;
      let productExceed: string;

      bought.forEach(async product => {
        const count = products.filter((x: string) => x === product).length;
        Product.findById(product, (err, doc) => {
          if (err) cb(err, null);
          if (doc.quantity - count < 0) {
            flag = 1;
            productExceed = doc.name;
            cb(null, [flag, productExceed]);
          } else {
            noCount += 1;
            if (bought.size === noCount) {
              cb(null, [flag, productExceed]);
            }
            // console.log(noCount);
          }
        });
      });
    },
    (result: any, cb: any) => {
      let noCount: number = 0;
      if (result[0] === 0) {
        bought.forEach(product => {
          const count = products.filter((x: string) => x === product).length;
          Product.findOneAndUpdate({ _id: product },
            { $inc: { quantity: -count } }, (err, doc) => {
              if (err) cb(err, null);
              noCount += 1;
              if (bought.size === noCount) {
                cb(null, [true, result[1]]);
              }
            });
        });
      } else {
        cb(null, [false, result[1]]);
      }
    },
    (result: any, cb: any) => {
      if (result[0]) {
        const now = new Date();
        const date = dateFormat(now, 'yyyy-mm-dd');

        const transaction = new Transaction({
          sellerid, buyeremail, price, date, products
        });
        transaction.save();
        cb(null, {
          message: 'Saved',
          transaction: transaction.toJSON()
        });
      } else {
        cb(null, {
          message: `Quantity not enough for ${result[1]}`
        });
      }
    }
  ];

  async.waterfall(tasks, (err, results) => {
    if (err) return res.send(err);
    return res.send(results);
  });
};

export default requestMiddleware(add, { validation: { body: addTransactionSchema } });
