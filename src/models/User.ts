import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IUser extends Document {
      email: string;
      name: string;
      avatar: string;
      mobile: number;
      shop: string;
      address: string;
      password: string;
}

interface IUserModel extends Model<IUser> { }

const schema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  mobile: { type: Number, required: true },
  address: { type: String, required: true },
  shop: { type: String, required: true },
  password: { type: String, required: true }
});

const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
