import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

const sale: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const transactions = await Transaction.find({ sellerid: mongoose.Types.ObjectId(id) });
  let totalSale: number = 0;

  transactions.forEach(trans => {
    totalSale += trans.price;
  });

  res.send({ 'total net sale': totalSale });
};

export default requestMiddleware(sale);
