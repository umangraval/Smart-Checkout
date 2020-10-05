import {
  Document, Model, Schema, model
} from 'mongoose';

export interface ICategory extends Document {
  owner: Schema.Types.ObjectId;
  tag: string;
}

interface ICategoryModel extends Model<ICategory> { }

const schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  tag: { type: String, required: true }
});

const Category: ICategoryModel = model<ICategory, ICategoryModel>('Category', schema);

export default Category;
