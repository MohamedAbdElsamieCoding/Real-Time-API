import { model, Schema, Types } from "mongoose";
import { IMessage } from "../types/message";

const messageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Types.ObjectId, ref: "Conversation" },
    userId: {
      type: Types.ObjectId,
      ref: "Auth",
    },
    content: String,
  },
  { timestamps: true },
);

export const Message = model<IMessage>("Message", messageSchema);
