import mongoose, {
  Document, Model, Schema, model
} from 'mongoose';

export interface ICategory extends Document {
  owner: mongoose.Types.ObjectId;
  tag: string;
}

interface ICategoryModel extends Model<ICategory> { }

const schema = new Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  tag: { type: String, required: true }
});

const Category: ICategoryModel = model<ICategory, ICategoryModel>('Category', schema);

export default Category;
