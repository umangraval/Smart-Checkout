import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line max-len
export const checkRole = (roles: Array<string>) => async (req: Request, res: Response, next: NextFunction) => {
  // Get the user ID from previous midleware
  const { role } = res.locals.jwtPayload;
  if (role === roles[0]) next();
  else res.status(401).send({ errors: { message: 'Not Authorised', status: 401 } });
};
