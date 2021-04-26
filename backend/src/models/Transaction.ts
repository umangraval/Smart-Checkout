import mongoose, {
  Document, Model, Schema, model
} from 'mongoose';

export interface ITransaction extends Document {
        buyeremail: string;
        sellerid: mongoose.Types.ObjectId;
        products: Schema.Types.Array;
        price: number;
        date: Date;
  }

interface ITransactionModel extends Model<ITransaction> { }

const schema = new Schema({
  buyeremail: { type: String, ref: 'BuyerUser' },
  sellerid: { type: mongoose.Types.ObjectId, ref: 'User' },
  price: { type: Number, required: true },
  products: [{ type: mongoose.Types.ObjectId, required: true }],
  date: { type: Date, required: true }
});

const Transaction: ITransactionModel = model<ITransaction, ITransactionModel>('Transaction', schema);

export default Transaction;
