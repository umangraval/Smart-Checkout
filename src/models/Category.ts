import {
  Document, Model, Schema, model
} from 'mongoose';

export interface ICategory extends Document {
    tag: string;
}

interface ICategoryModel extends Model<ICategory> { }

const schema = new Schema({
  tag: { type: String, required: true },
});

const Book: ICategoryModel = model<ICategory, ICategoryModel>('Category', schema);

export default Category;
