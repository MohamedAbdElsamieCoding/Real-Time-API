import { Schema, Types, model } from "mongoose";
import { IConversation } from "../types/conversation";

const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "Auth",
      },
    ],
    isGroup: { type: Boolean, default: false },
    name: String,
    lastMessage: { type: Types.ObjectId, ref: "Message" },
  },
  { timestamps: true },
);

export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema,
);
