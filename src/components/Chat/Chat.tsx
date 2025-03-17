import React from "react";
import { ChatProps } from "./Chat.interface";
import style from "./Chat.module.css";

const Chat = ({
  handleSubmit,
  handleInputChange,
  input,
  isLoadingChat,
}: ChatProps) => {
  return (
    <form
      className={style.chatForm}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event);
      }}
    >
      <section>
        <textarea
          className={style.chatTextArea}
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query here"
        />
        <button disabled={isLoadingChat}>
          {isLoadingChat ? "Loading..." : " Ask"}
        </button>
      </section>
    </form>
  );
};

export default Chat;
