import { IMessage, sendMessage, getMessagesList } from "./messagesAPI";
import store, { getHistoryLength, getNewMessages } from "../redux/store";
import { newMessage } from "../redux/actions";
import { createElMessage, createLayout, resetForm, addErrorStyle } from "./dom";

export function addMessages(root: HTMLElement, messages: IMessage[]): void {
  messages.forEach((message) => root.append(createElMessage(message)));
  root.scrollTop = root.scrollHeight; // eslint-disable-line no-param-reassign
}

function isMessage(message: unknown): message is IMessage {
  if (typeof message !== "object" || message === null) {
    return false;
  }

  if (
    !["name", "message"].every(
      (prop) => prop in message && typeof prop === "string"
    )
  ) {
    return false;
  }

  const date = (message as { date?: any })?.date;
  if (!date || !(date instanceof Date) || Number.isNaN(Number(date))) {
    return false;
  }

  return true;
}

export function filterMessages(messages: unknown[]): IMessage[] {
  const res: IMessage[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const message of messages) {
    if (isMessage(message)) {
      res.push(message);
    }
  }
  return res;
}

function handleMessages() {
  const messages = getNewMessages();
  const filteredMessages = filterMessages(messages);
  if (filteredMessages.length > 0) {
    const messageHistoryEl = document.getElementById("message__history")!;
    addMessages(messageHistoryEl, filteredMessages);
  }
}

export async function updateMessages() {
  const curHistoryLength = getHistoryLength();
  const messages = await getMessagesList();
  if (messages.length > curHistoryLength) {
    const newMessagesSlice = messages.slice(curHistoryLength);
    store.dispatch(
      newMessage({ messageHistory: messages, newMessage: newMessagesSlice })
    );
  }
}

export function initApp(root: HTMLElement, initListening = false): HTMLElement {
  const app = createLayout(root, sendMessages); // eslint-disable-line @typescript-eslint/no-use-before-define
  if (initListening) {
    store.subscribe(handleMessages);
    setInterval(() => updateMessages(), 3000);
    updateMessages();
  }

  return app;
}

export async function sendMessages(e: Event) {
  const form = e.target as HTMLFormElement;
  (form.querySelector("#message__send-btn") as HTMLButtonElement).disabled =
    true;
  e.preventDefault();
  const elNickname = document.getElementById(
    "message__nickname-input"
  ) as HTMLInputElement | null;
  const nickname = elNickname?.value;
  if (!nickname) {
    addErrorStyle(elNickname!);
    return;
  }

  const elMessage = document.getElementById(
    "message__text-input"
  ) as HTMLTextAreaElement | null;
  const messageText = elMessage?.value;
  if (!messageText) {
    addErrorStyle(elMessage!);
    return;
  }

  const message = { name: nickname!, message: messageText! };
  await sendMessage(message).catch((err) => {
    alert(`Oooops! Something happened. ${err.toString()}`);
  });
  resetForm(form);
}
