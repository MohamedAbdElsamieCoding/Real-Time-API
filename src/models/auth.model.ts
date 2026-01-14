import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IAuth } from "../types/auth";

const authSchema = new Schema<IAuth>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

//  Hash password while creating model
authSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch (error) {
    throw error;
  }
});

// Compare password
authSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const Auth = model<IAuth>("Auth", authSchema);
