import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IProduct extends Document {
  owner: Schema.Types.ObjectId;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

interface IProductModel extends Model<IProduct> { }

const schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: Schema.Types.String, ref: 'Category' }
});

const Product: IProductModel = model<IProduct, IProductModel>('Product', schema);

export default Product;
