import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';

const all: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const categories = await Category.find({ owner: id });
  res.send({ categories });
};

export default requestMiddleware(all);
