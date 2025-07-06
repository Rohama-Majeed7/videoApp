import mongoose, { models, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  videos: Types.ObjectId[]; // instead of []
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);
export default User;
