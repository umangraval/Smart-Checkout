import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IBuyerUser extends Document {
        email: string;
        name: string;
        mobile: number;
        password: string;
  }

interface IBuyerUserModel extends Model<IBuyerUser> { }

const schema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true }
});

const BuyerUser: IBuyerUserModel = model<IBuyerUser, IBuyerUserModel>('BuyerUser', schema);

export default BuyerUser;
