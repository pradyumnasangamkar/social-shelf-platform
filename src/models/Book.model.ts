import mongoose, { models, model, Schema } from "mongoose";

export interface IBook {
  _id?: mongoose.Types.ObjectId;
  bookId: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookSchema = new Schema<IBook>(
  {
    bookId: {
      type: String,
      required: [true, "Book id is not Assigned !"],
      unique: true,
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    title: {
      type: String,
      required: [true, "Please Provide a username"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Please Provide a email"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Please Provide a email"],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = models?.books || model<IBook>("books", bookSchema);

export default Book;
