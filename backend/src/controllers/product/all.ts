import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';

const all: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ id });
  res.send({ products });
};

export default requestMiddleware(all);
