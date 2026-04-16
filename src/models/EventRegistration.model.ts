import mongoose, { models, model, Schema } from "mongoose";

export interface IEventRegistration {
  _id?: mongoose.Types.ObjectId;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: "registered" | "cancelled";
  registeredAt: Date;
  cancelledAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const eventRegistrationSchema = new Schema<IEventRegistration>(
  {
    eventId: {
      type: String,
      required: [true, "Event ID is required"],
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
    status: {
      type: String,
      enum: ["registered", "cancelled"],
      default: "registered",
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    cancelledAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Add indexes for faster queries
eventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });
eventRegistrationSchema.index({ status: 1 });
eventRegistrationSchema.index({ userEmail: 1 });

const EventRegistration =
  models?.eventRegistrations ||
  model<IEventRegistration>("eventRegistrations", eventRegistrationSchema);

export default EventRegistration;
