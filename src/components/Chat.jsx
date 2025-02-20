// eslint-disable-next-line no-unused-vars
import React from "react";
import Prompt from "./Prompt";
import Massages from "./Massages";

const Chat = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[900px] h-full w-full flex flex-col relative">
        <Massages />
        <Prompt />
      </div>
    </div>
  );
};

export default Chat;
