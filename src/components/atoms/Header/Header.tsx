import Image from "next/image";
import Link from "next/link";
import React from "react";
import chatCircleText from "../../../assets/images/chat-circle-text.svg";
import gear from "../../../assets/images/gear.svg";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.headerContainer}>
      <div className={style.chatLogoContainer}>
        <Image
          alt="Chat with text logo"
          width={177}
          height={50}
          src={chatCircleText}
        />
      </div>
      <Link href={"/createdatabase"}>
        <Image alt="Gear icon" width={133} height={38} src={gear} />
      </Link>
    </header>
  );
};

export default Header;
