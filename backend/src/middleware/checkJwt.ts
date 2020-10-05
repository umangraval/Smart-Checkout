import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied' });
  }
  // Try to validate the token and get data
  try {
    const jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    next();
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({ error: 'Not Authenticated' });
  }

  // The token is valid for 1 hour
  // We want to send a new token on every request
  // const { userId, email } = jwtPayload;
  // const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
  //   expiresIn: '1h'
  // });
  // res.setHeader('token', newToken);
};
