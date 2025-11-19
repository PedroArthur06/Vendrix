import { Schema, model, Document } from "mongoose";
import { User, UserProfile, Address } from "../../domain/user.types";

const UserProfileSchema = new Schema<UserProfile>(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
    },
  },
  { _id: false }
);

export type UserDocument = User & Document;

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "supplier"],
      default: "customer",
      required: true,
    },
    profile: {
      type: UserProfileSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

export const UserModel = model<UserDocument>("User", UserSchema);
