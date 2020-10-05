import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import BuyerUser from '../../models/BuyerUser';

export const addBuyerUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  name: Joi.string().required(),
  mobile: Joi.number().required(),
  password: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    email, name, mobile, password
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new BuyerUser({
    email, name, mobile, password: hashed
  });
  await user.save();

  res.send({
    message: 'Registered',
    user: user.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addBuyerUserSchema } });
