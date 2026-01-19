import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { Conversation } from "../models/conversation.model";
import { sendResponse } from "../utils/send-response";

export const conversationCreate = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { participantId } = req.body;
    const myId = req.user?._id;

    let conversation = await Conversation.findOne({
      isGroup: false,
      participants: { $all: [myId, participantId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [myId, participantId],
      });
    }
    sendResponse(res, 201, "Conversation ready", conversation);
  },
);

export const getMyConversations = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const myId = req.user?._id;

    const conversations = await Conversation.find({
      participants: myId,
    })
      .populate("participants", "userName email")
      .populate("lastMessage");

    sendResponse(res, 200, "Conversation fetched", conversations);
  },
);
