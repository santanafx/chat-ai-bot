import React from "react";
import { TextProps } from "./Text.interface";
import styles from "./Text.module.css";

const Text = ({ children, type: Tag = "h1", color }: TextProps) => {
  return (
    <Tag className={styles[Tag]} style={{ color }}>
      {children}
    </Tag>
  );
};

export default Text;
