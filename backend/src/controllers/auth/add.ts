import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';
import config from '../../config/config';

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
  // console.log(avatar);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({
    email, name, avatar, mobile, address, shop, password: hashed
  });
  await user.save();

  const payload = {
    userId: user._id
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

export default requestMiddleware(add, { validation: { body: addUserSchema } });
