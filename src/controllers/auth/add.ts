import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';

export const addUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  name: Joi.string().required(),
  mobile: Joi.number().required(),
  address: Joi.string().required(),
  shop: Joi.string().required(),
  password: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    email, name, mobile, address, shop, password
  } = req.body;

  const options: gravatar.Options = {
    s: '200',
    r: 'pg',
    d: 'mm'
  };

  const avatar = gravatar.url(email, options);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({
    email, name, mobile, address, shop, password: hashed
  });
  await user.save();

  res.send({
    message: 'Registered',
    user: user.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addUserSchema } });
