import mongoose, { models, model, Schema } from "mongoose";

export interface IRentedBook {
  _id?: mongoose.Types.ObjectId;
  bookId: string;
  renterId: string;
  renterName: string;
  renterEmail: string;
  bookTitle: string;
  rentDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "pending" | "active" | "returned" | "overdue" | "rejected";
  fine?: number;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const rentedBookSchema = new Schema<IRentedBook>(
  {
    bookId: {
      type: String,
      required: [true, "Book ID is required"],
    },
    renterId: {
      type: String,
      required: [true, "Renter ID is required"],
    },
    renterName: {
      type: String,
      required: [true, "Renter name is required"],
    },
    renterEmail: {
      type: String,
      required: [true, "Renter email is required"],
    },
    bookTitle: {
      type: String,
      required: [true, "Book title is required"],
    },
    rentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "active", "returned", "overdue", "rejected"],
      default: "pending",
    },
    fine: {
      type: Number,
      default: 0,
    },
    approvedBy: {
      type: String,
    },
    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Add index for faster queries
rentedBookSchema.index({ bookId: 1, renterId: 1 });
rentedBookSchema.index({ status: 1 });
rentedBookSchema.index({ dueDate: 1 });
rentedBookSchema.index({ approvedBy: 1 });

const RentedBook =
  models?.rentedBooks || model<IRentedBook>("rentedBooks", rentedBookSchema);

export default RentedBook;
