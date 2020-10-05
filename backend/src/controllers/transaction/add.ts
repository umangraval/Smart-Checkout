import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Transaction from '../../models/Transaction';

export const addTransactionSchema = Joi.object().keys({
  sellerid: Joi.string().required(),
  buyeremail: Joi.string().email(),
  price: Joi.number().required(),
  quantity: Joi.number().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    sellerid, price, quantity, buyeremail
  } = req.body;
  const date = new Date();

  const transaction = new Transaction({
    sellerid, buyeremail, price, quantity, date
  });
  await transaction.save();

  res.send({
    message: 'Saved',
    transaction: transaction.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addTransactionSchema } });
