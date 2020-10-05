import { RequestHandler } from 'express';
import dateFormat from 'dateformat';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

const dailySale: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const dates = await Transaction.find({ sellerid: id }).distinct('date');
  const transactions = await Transaction.find({ sellerid: id });
  const dailyCount: { [key: string]: Number } = {};

  dates.forEach(date => {
    const cdate = new Date(date);
    dailyCount[dateFormat(date, 'yyyy-mm-dd')] = transactions.filter(e => e.date.toISOString() === cdate.toISOString())
      .reduce((sum, { price } : { price: number }) => sum + price, 0);
  });

  res.send(dailyCount);
};

export default requestMiddleware(dailySale);
