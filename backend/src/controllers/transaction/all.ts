import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

const all: RequestHandler = async (req, res) => {
  const transaction = await Transaction.find();
  res.send({ transaction });
};

export default requestMiddleware(all);
