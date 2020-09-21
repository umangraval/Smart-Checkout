import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';

const all: RequestHandler = async (req, res) => {
  const categorries = await Category.find();
  res.send({ categorries });
};

export default requestMiddleware(all);
