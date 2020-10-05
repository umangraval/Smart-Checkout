import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

const all: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.find({ id });
  res.send({ transaction });
};

export default requestMiddleware(all);
