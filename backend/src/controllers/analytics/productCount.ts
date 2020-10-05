import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';
import Product, { IProduct } from '../../models/Product';
import Transaction from '../../models/Transaction';

const productCount: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const totalProducts = await (await Product.find({ owner: id })).length;
  const totalCategories = await (await Category.find({ owner: id })).length;

  res.send({ totalProducts, totalCategories });
};

export default requestMiddleware(productCount);
