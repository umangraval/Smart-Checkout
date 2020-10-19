import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';

const profile: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const userProfile = await User.findById(id, {
    _id: 0, password: 0, __v: 0
  });
  res.send({ userProfile });
};

export default requestMiddleware(profile);
