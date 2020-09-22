import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Category from '../../models/Category';
import Product, { IProduct } from '../../models/Product';

const all: RequestHandler = async (req, res) => {
  const products = await Product.find();
  const categories = await Category.find();
  // const userTestStatus: IProduct[] = [];
  const userTestStatus: { [key: string]: IProduct[] } = {};

  categories.forEach(element => {
    // eslint-disable-next-line max-len
    userTestStatus[element.tag.toString()] = products.filter(e => e.category.toString() === element.tag.toString());
  });
  res.send(userTestStatus);
};

export default requestMiddleware(all);
