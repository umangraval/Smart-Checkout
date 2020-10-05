import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import dateFormat from 'dateformat';
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
  bought.forEach(async product => {
    const count = products.filter((x: string) => x === product).length;
    await Product.findOneAndUpdate({ _id: product },
      { $inc: { quantity: -count } });
  });

  const now = new Date();
  const date = dateFormat(now, 'yyyy-mm-dd');

  const transaction = new Transaction({
    sellerid, buyeremail, price, date, products
  });
  await transaction.save();

  res.send({
    message: 'Saved',
    transaction: transaction.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addTransactionSchema } });
