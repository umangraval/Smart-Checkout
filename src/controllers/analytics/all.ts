import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';
import Product from '../../models/Product';

const all: RequestHandler = async (req, res) => {
  const categories = await Category.find();
  res.send({ categories });
};

export default requestMiddleware(all);
