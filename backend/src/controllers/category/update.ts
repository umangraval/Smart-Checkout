import { RequestHandler } from 'express';
import Joi, { string } from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';

export const updateCategorySchema = Joi.object().keys({
  _id: Joi.string().length(24).required(),
  tag: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const {
    _id
  } = req.body;

  await Category.findOneAndUpdate({ _id },
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

export default requestMiddleware(update, { validation: { body: updateCategorySchema } });
