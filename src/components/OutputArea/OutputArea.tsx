import React from "react";
import Text from "../Text/Text";
import { OutputAreaProps } from "./OutputArea.interface";
import style from "./OutputArea.module.css";

const OutputArea = ({ isLoadingChat, messages, data }: OutputAreaProps) => {
  return (
    <section>
      {isLoadingChat ? (
        <div className={style.chatContainer}>
          <Text type="h1" color="var(--text-color-main)">
            Loading...
          </Text>
        </div>
      ) : (
        <article className={style.chatContainer}>
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? style.userMessage
                    : style.assistantMessage
                }
              >
                <div>
                  {message.content.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </article>
      )}
      <article className={style.retrievalsContainer}>
        {data?.length !== undefined && data.length > 0 && (
          <span>
            {(data[data.length - 1] as any).retrievals
              .split("\n")
              .map((line, i) => (
                <React.Fragment key={i}>
                  {line.includes("Resume Finding") ? (
                    <strong>{line}</strong>
                  ) : (
                    line
                  )}
                  <br />
                </React.Fragment>
              ))}
          </span>
        )}
      </article>
    </section>
  );
};

export default OutputArea;
