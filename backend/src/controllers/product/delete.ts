import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';

const del: RequestHandler = async (req, res) => {
  const { id = undefined } = req.params;

  // const query = buildBookSeachQuery((id as string));
  if (isValidObjectId(id)) {
    await Product.findByIdAndDelete(id);
    return res.send({
      message: 'Deleted'
    });
  }
  return res.status(400).send({ error: { message: 'Invalid Id', status: 400 } });
};

export default requestMiddleware(del);
