import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';
import Product, { IProduct } from '../../models/Product';
import Transaction from '../../models/Transaction';

const outOfstock: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ owner: id });
  const outofstock = products.filter(e => e.quantity === 0).map(({ name }) => name);
  res.send({ outofstock });
};

export default requestMiddleware(outOfstock);
