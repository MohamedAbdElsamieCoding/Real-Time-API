import { Types } from "mongoose";

export interface IMessage {
  conversationId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
