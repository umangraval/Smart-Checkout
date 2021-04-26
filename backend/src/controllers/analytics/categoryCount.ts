import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';
import Product, { IProduct } from '../../models/Product';
import Transaction from '../../models/Transaction';

const categoryCount: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ owner: id });
  const categories = await Category.find({ owner: id });
  const userTestStatus: { [key: string]: Number } = {};

  categories.forEach(element => {
    // eslint-disable-next-line max-len
    userTestStatus[element.tag.toString()] = products.filter(e => e.category.toString() === element.tag.toString()).length;
  });
  res.send(userTestStatus);
};

export default requestMiddleware(categoryCount);
