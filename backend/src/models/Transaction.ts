import {
  Document, Model, Schema, model
} from 'mongoose';

export interface ITransaction extends Document {
        buyeremail: string;
        sellerid: Schema.Types.ObjectId;
        price: number;
        quantity: number;
        date: Date;
  }

interface ITransactionModel extends Model<ITransaction> { }

const schema = new Schema({
  buyeremail: { type: String, ref: 'BuyerUser' },
  sellerid: { type: Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Transaction: ITransactionModel = model<ITransaction, ITransactionModel>('Transaction', schema);

export default Transaction;
