/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from "redux";
import { IMessage } from "../app/messagesAPI";
import { IAction } from "./actions";

export interface IState {
  messageHistory: IMessage[];
  newMessage: IMessage[];
}

const initialState: IState = {
  messageHistory: [],
  newMessage: [],
};

const reducer: Reducer<IState, IAction> = (
  state: IState = initialState,
  action
) => {
  if (action.type === "RECEIVED_NEW_MESSAGES") {
    const { messageHistory, newMessage } = action.payload;
    return {
      ...state,
      messageHistory,
      newMessage,
    };
  }
  return state;
};

export default reducer;
