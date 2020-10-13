import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Buyer from '../../models/BuyerUser';

const profile: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const userProfile = await Buyer.findById(id);
  res.send({ userProfile });
};

export default requestMiddleware(profile);
