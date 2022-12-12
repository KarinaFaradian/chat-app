import { IMessage } from "../app/messagesAPI";

type NewMessageAction = {
  type: "RECEIVED_NEW_MESSAGES";
  payload?: { messageHistory: IMessage[]; newMessage: IMessage[] };
};

export type IAction = NewMessageAction;

export const newMessage = (payload: NewMessageAction["payload"]) => ({
  type: "RECEIVED_NEW_MESSAGES" as const,
  payload,
});
