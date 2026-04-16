import mongoose, { models, model, Schema } from "mongoose";

export interface IDonate {
  _id?: mongoose.Types.ObjectId;
  bookId: string;
  name: string;
  email: string;
  title: string;
  author: string;
  condition: string;
  message?: string;
  accepted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userDonate = new Schema<IDonate>(
  {
    bookId: {
      type: String,
      required: [true, "Book id is not Assigned !"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please Provide a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide a email"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please Provide a email"],
    },
    author: {
      type: String,
      required: [true, "Please provide a Author !"],
    },
    condition: {
      type: String,
      required: [true, "Please provide a condition !"],
    },
    message: {
      type: String,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Donate = models?.donates || model<IDonate>("donates", userDonate);

export default Donate;
