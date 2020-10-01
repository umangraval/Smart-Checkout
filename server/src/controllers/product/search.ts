import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';

const get: RequestHandler = async (req, res) => {
  const { id = undefined } = req.query;

  // const query = buildBookSeachQuery((id as string));
  if (isValidObjectId(id)) {
    const product = await Product.findById(id);
    return res.send({ product });
  }
  return res.status(400).send({ error: { message: 'Invalid Id', status: 400 } });
};

export default requestMiddleware(get);
