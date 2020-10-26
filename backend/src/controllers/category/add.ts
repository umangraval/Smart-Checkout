import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';

export const addCategorySchema = Joi.object().keys({
  tag: Joi.string().required(),
  owner: Joi.string().length(24).required()
});

const add: RequestHandler = async (req, res) => {
  const {
    owner, tag
  } = req.body;
  const tagExist = await Category.find({ owner, tag });
  if (tagExist.length === 0) {
    const category = new Category({
      owner, tag
    });
    await category.save();

    return res.send({
      message: 'Saved',
      category: category.toJSON()
    });
  }
  return res.status(400).send({
    errors:
    {
      message: 'Category Name Exist',
      status: 400
    }
  });
};

export default requestMiddleware(add, { validation: { body: addCategorySchema } });
