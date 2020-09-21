import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

export const addTransactionSchema = Joi.object().keys({
  username: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    username, price, quantity
  } = req.body;

  const transaction = new Transaction({
    username, price, quantity
  });
  await transaction.save();

  res.send({
    message: 'Saved',
    transaction: transaction.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addTransactionSchema } });
