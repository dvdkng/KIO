// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("prompt: ", prompt);

    setPrompt("");
  };

  return (
    <>
      <div className="bg-linear-0 from-neutral-800 to-transparent w-full h-30 absolute bottom-0 pointer-events-none" />
      <div className="absolute w-full bottom-0 bg-neutral-800">
        <form
          onSubmit={handleSubmit}
          className=" bg-neutral-800 flex items-center w-full rounded-full border-2 border-neutral-400"
        >
          <input
            placeholder="send a message to KIO ..."
            value={prompt}
            onInput={(e) => {
              setPrompt(e.target.value);
            }}
            className="py-3 pl-6 pr-3 outline-none w-full placeholder:text-neutral-400"
            type="text"
          />
          <button className="mx-2 bg-orange-500 p-2 rounded-full cursor-pointer">
            <FaAngleRight />
          </button>
        </form>
      </div>
    </>
  );
};

export default Prompt;
