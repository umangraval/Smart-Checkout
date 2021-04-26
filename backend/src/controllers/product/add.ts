import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import crypto from 'crypto-js';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';
import config from '../../config/config';

export const addProductSchema = Joi.object().keys({
  owner: Joi.string().length(24).required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  quantity: Joi.number().required().min(1),
  price: Joi.number().required().min(1)
});

const add: RequestHandler = async (req, res) => {
  const {
    owner, name, price, category, quantity
  } = req.body;
  const productExist = await Product.find({ owner, name });
  if (productExist.length === 0) {
    const product = new Product({
      owner, name, price, category, quantity
    });
    await product.save();
    const qrcodeData: string = (crypto.AES.encrypt(`https://smartcheckout.tech/api/v1/qrcode/${product._id}`, config.AES_KEY)).toString();
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
  }
  return res.status(400).send({
    errors:
    {
      message: 'Product Name Exist',
      status: 400
    }
  });
};

export default requestMiddleware(add, { validation: { body: addProductSchema } });
