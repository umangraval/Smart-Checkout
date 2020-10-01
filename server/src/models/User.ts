import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IUser extends Document {
      username: string;
      name: string;
      mobile: number;
      shop: string;
      address: string;
}

interface IUserModel extends Model<IUser> { }

const schema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  address: { type: String, required: true },
  shop: { type: String, required: true }
});

const Book: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
