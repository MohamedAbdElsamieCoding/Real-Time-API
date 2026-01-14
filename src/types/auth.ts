import { Document } from "mongoose";

export interface IAuth extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}
