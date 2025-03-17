"use client";
import Chat from "@/components/atoms/Chat/Chat";
import Header from "@/components/atoms/Header/Header";
import OutputArea from "@/components/atoms/OutputArea/OutputArea";
import Text from "@/components/atoms/Text/Text";
import { useChat } from "ai/react";
import React from "react";
import style from "./page.module.css";

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

  return (
    <>
      <Header />
      <section className={style.sectionContainer}>
        <Text type="h1" color="var(--text-color-main)">
          Welcome to Chat with Text! To get started, upload your database by
          clicking the gear icon in the top right corner and ask your question.
        </Text>
        <OutputArea
          data={data}
          isLoadingChat={isLoadingChat}
          messages={messages}
        />
        <Chat
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          input={input}
          isLoadingChat={isLoadingChat}
        />
      </section>
    </>
  );
};

export default Home;
