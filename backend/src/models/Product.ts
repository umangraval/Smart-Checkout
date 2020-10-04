import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  quantity: number;
}

interface IProductModel extends Model<IProduct> { }

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: Schema.Types.String, ref: 'Category' }
});

const Product: IProductModel = model<IProduct, IProductModel>('Product', schema);

export default Product;
