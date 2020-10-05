import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';

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

  res.send({
    message: 'Saved',
    product: product.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addProductSchema } });
