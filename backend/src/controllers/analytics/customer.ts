import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

const customerCount: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const totalcustomers = await (await Transaction.find({ sellerid: id }).distinct('buyeremail')).length;
  res.send({ 'Total unique customers': totalcustomers });
};

export default requestMiddleware(customerCount);
