"use client";
import { useChat } from "ai/react";
import React from "react";
import { toast } from "react-toastify";

const Home = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: isLoadingChat,
    data,
  } = useChat({
    api: "api/chatroute",
  });

  const handleCreateDatabase = async () => {
    const response = await fetch("api/createdatabase", {
      method: "POST",
    });

    if (response.ok) {
      toast("Database created!");
    }
  };

  return (
    <div>
      <button onClick={handleCreateDatabase}>Create database</button>
      <div>
        <div>{isLoadingChat}</div>
        <div>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <div>{message.role}</div>
                <div>{message.content}</div>
              </div>
            );
          })}
        </div>
        {data?.length !== undefined && data.length > 0 && (
          <span>{(data[data.length - 1] as any).retrievals as string}</span>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your query here"
          />
          <button disabled={isLoadingChat}>
            {isLoadingChat ? "Loading..." : " Ask"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
