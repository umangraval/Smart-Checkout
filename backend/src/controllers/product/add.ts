import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import crypto from 'crypto-js';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';
import config from '../../config/config';

export const addProductSchema = Joi.object().keys({
  owner: Joi.string().required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    owner, name, price, category, quantity
  } = req.body;

  const product = new Product({
    owner, name, price, category, quantity
  });
  await product.save();
  const qrcodeData: string = (crypto.AES.encrypt(`${req.protocol}://${req.get('host')}/api/qrcode/${product._id}`, config.AES_KEY)).toString();
  await Product.findOneAndUpdate({ _id: product._id },
    { $set: { qrcodeData } }, { new: true },
    (err, doc) => {
      if (err) {
        return res.status(500).send({
          error: {
            message: 'Server Error',
            status: 500
          }
        });
      }
      return res.send({
        message: 'Saved',
        product: doc.toJSON()
      });
    });
};

export default requestMiddleware(add, { validation: { body: addProductSchema } });
