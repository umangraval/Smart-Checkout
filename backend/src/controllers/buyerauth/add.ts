/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import BuyerUser from '../../models/BuyerUser';
import config from '../../config/config';

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
  const userExist = await BuyerUser.findOne({ email });
  if (userExist) return res.status(400).send({ errors: { message: 'User Exist', status: 400 } });
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new BuyerUser({
    email, name, mobile, password: hashed
  });
  await user.save();

  const payload = {
    userId: user._id,
    role: 'BUYER'
  };

  jwt.sign(
    payload,
    config.jwtSecret,
    { expiresIn: config.jwtExpiration },
    (err, token) => {
      if (err) throw err;
      return res.send({
        message: 'Registered',
        token
      });
    }
  );
};

export default requestMiddleware(add, { validation: { body: addBuyerUserSchema } });
