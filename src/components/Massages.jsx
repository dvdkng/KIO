import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscribe } from "../helper/event";

const Messages = () => {
  const [KIOWriting, setKIOWriting] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    subscribe("onChatChange", (e) => {
      const id = e.detail.id;

      console.log(`http://localhost:5000/conversations/${id}`);

      fetch(`http://localhost:5000/conversations/${id}`)
        .then((response) => response.json())
        .then((data) => setMessages(data.chat))
        .catch((error) => console.error("Cannot load messages:", error));
    });
  }, []);

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide flex flex-col gap-5 w-full relative pb-20">
      {/* <img src={blurry} alt="" className="pointer-events-none fixed w-[50%] top-[-5vw] right-0" /> */}

      <AnimatePresence mode="wait">
        {messages.length > 0 ? (
          messages.map((message, i) => {
            const styles = {
              user: "self-end ml-[100px] bg-neutral-700",
              kio: "self-start bg-orange-500 mr-[100px]",
            };

            const style = styles[message.sender];

            return (
              <motion.div
                key={i}
                className={`py-3 px-5 rounded-2xl ${style}`}
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{ duration: 0.2, delay: i * 0.2 }}
                // style={{ overflow: "hidden" }}
              >
                <p>{message.content}</p>
              </motion.div>
            );
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center flex-col">
            <p className="font-bold text-2xl text-neutral-400 text-center">
              Hi, I am KIO. How can I help you?
            </p>
          </div>
        )}
      </AnimatePresence>

      <KIOWritingIndicator isWriting={KIOWriting} />
    </div>
  );
};

const KIOWritingIndicator = ({ isWriting }) => {
  const numberOfDots = 3;

  return (
    isWriting && (
      <div className="p-3 rounded-2xl bg-orange-500 self-start flex gap-1">
        {Array.from({ length: numberOfDots }).map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square w-1.5 bg-white rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    )
  );
};

export default Messages;
