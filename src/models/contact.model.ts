import mongoose, { models, model, Schema } from "mongoose";

export interface IContact {
  _id?: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  phoneno: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userContact = new Schema<IContact>(
  {
    fullname: {
      type: String,
      required: [true, "Please Provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please Provide a email"],
    },
    phoneno: {
      type: String,
      required: [true, "Please Provide a phone number"],
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Contact = models?.contact || model<IContact>("contact", userContact);

export default Contact;
