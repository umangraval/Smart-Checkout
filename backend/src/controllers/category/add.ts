import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';

export const addCategorySchema = Joi.object().keys({
  tag: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    tag
  } = req.body;

  const category = new Category({
    tag
  });
  await category.save();

  res.send({
    message: 'Saved',
    category: category.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addCategorySchema } });
