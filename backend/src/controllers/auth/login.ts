import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';
import config from '../../config/config';

export const loginUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});

const login: RequestHandler = async (req, res) => {
  const {
    email, password
  } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({
      errors:
        {
          message: 'Invalid Credentials',
          status: 400
        }
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send({
      errors:
        {
          message: 'Invalid Credentials',
          status: 400
        }
    });
  }

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
        message: 'Logged In',
        token
      });
    }
  );
};

export default requestMiddleware(login, { validation: { body: loginUserSchema } });
