import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';

const all: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ owner: mongoose.Types.ObjectId(id) });
  res.send({ products });
};

export default requestMiddleware(all);
