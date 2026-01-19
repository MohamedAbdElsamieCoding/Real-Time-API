import { Types } from "mongoose";

export interface IConversation {
  participants: Types.ObjectId[];
  isGroup: boolean;
  name: string;
  lastMessage: Types.ObjectId;
}
