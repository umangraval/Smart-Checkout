import { RequestHandler } from 'express';
import Joi, { string } from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';

export const updateProductSchema = Joi.object().keys({
  owner: Joi.string().length(24).required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required()
});

const update: RequestHandler = async (req, res) => {
  const {
    id
  } = req.params;

  await Product.findOneAndUpdate({ _id: id },
    { $set: req.body },
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
        message: 'Updated',
        product: req.body
      });
    });
};

export default requestMiddleware(update, { validation: { body: updateProductSchema } });
