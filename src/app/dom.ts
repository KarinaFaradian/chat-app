/* eslint-disable import/prefer-default-export */
import { IMessage } from "./messagesAPI";

export function createElMessage(message: IMessage): HTMLElement {
  const elMessage = document.createElement("section");
  elMessage.classList.add("message");

  const elNickname = document.createElement("div");
  elNickname.classList.add("message__nickname");
  elNickname.innerText = message.name;
  elMessage.append(elNickname);

  const elText = document.createElement("p");
  elText.classList.add("message__text");
  elText.innerText = message.message;
  elMessage.append(elText);

  const elDate = document.createElement("time");
  elDate.classList.add("message__date");
  elDate.innerText = message.date.toLocaleString();
  elMessage.append(elDate);

  return elMessage;
}

function removeError(button: HTMLButtonElement, e: Event) {
  const el = e.target as HTMLElement;
  el.classList.remove("error");
  button.disabled = false; // eslint-disable-line no-param-reassign
}

export function addErrorStyle(el: HTMLElement) {
  el.classList.add("error");
  (document.getElementById("message__send-btn") as HTMLButtonElement).disabled =
    true;
}

export function createLayout(
  root: HTMLElement,
  onSendMessage: (e: Event) => void
): HTMLElement {
  const configureElement = (el: HTMLElement, name: string): void => {
    el.id = name; // eslint-disable-line no-param-reassign
    el.classList.add(name);
    if (name !== "message__container") {
      form.append(el); // eslint-disable-line @typescript-eslint/no-use-before-define
    }
  };

  const form = document.createElement("form");
  configureElement(form, "message__container");
  form.addEventListener("submit", onSendMessage);

  const h1 = document.createElement("h1");
  h1.classList.add("message__title");
  h1.innerText = "Chat";
  form.append(h1);

  const historySection = document.createElement("section");
  configureElement(historySection, "message__history");

  const sendBtn = document.createElement("button");
  sendBtn.innerText = "Send";
  configureElement(sendBtn, "message__send-btn");

  const nicknameInput = document.createElement("input");
  nicknameInput.setAttribute("type", "text");
  nicknameInput.setAttribute("placeholder", "Enter your name...");
  nicknameInput.addEventListener("input", removeError.bind(null, sendBtn));
  configureElement(nicknameInput, "message__nickname-input");

  const messageInput = document.createElement("textarea");
  messageInput.setAttribute("placeholder", "Leave your text here...");
  messageInput.addEventListener("input", removeError.bind(null, sendBtn));
  configureElement(messageInput, "message__text-input");

  const app = document.createElement("div");
  app.classList.add("app");
  app.append(form);

  root.append(app);

  return app;
}

export function resetForm(form: HTMLFormElement) {
  /* eslint-disable no-param-reassign */
  (form.querySelector("#message__nickname-input") as HTMLInputElement).value =
    "";
  (form.querySelector("#message__text-input") as HTMLTextAreaElement).value =
    "";
  (form.querySelector("#message__send-btn") as HTMLButtonElement).disabled =
    false;
}
