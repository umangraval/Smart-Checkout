import {
  Document, Model, Schema, model
} from 'mongoose';

export interface ITransaction extends Document {
        name: string;
        price: number;
        quantity: number;
  }

interface ITransactionModel extends Model<ITransaction> { }

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const Book: ITransactionModel = model<ITransaction, ITransactionModel>('Transaction', schema);

export default Transaction;
