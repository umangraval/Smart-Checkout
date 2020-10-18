import { RequestHandler } from 'express';
import BuyerUser from '../../models/BuyerUser';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

const buyerTrans: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await BuyerUser.findById(id, async (err: any, getBuyer: any) => {
    if (err) console.log(err);
    const transaction = await Transaction.find({ buyeremail: getBuyer.email }, { __v: 0, buyeremail: 0 }).populate('sellerid', 'shop -_id');
    res.send({ transaction });
  });
};

export default requestMiddleware(buyerTrans);
