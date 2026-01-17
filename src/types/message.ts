import { Types } from "mongoose";

export interface IMessage {
  userId: Types.ObjectId;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
