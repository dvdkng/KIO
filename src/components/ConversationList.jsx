import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConversationList = ({
  conversations,
  activeConv,
  onConvClick,
  animationOffset,
}) => (
  <AnimatePresence mode="wait">
    {conversations.map((conv) => (
      <motion.div
        key={conv.id}
        onClick={() => onConvClick(conv)}
        className={`w-full py-3 px-5 cursor-pointer truncate duration-100 ${
          activeConv === conv
            ? "bg-neutral-700 hover:bg-neutral-600"
            : "bg-neutral-800 hover:bg-neutral-700"
        }`}
        initial={{ opacity: 0, x: -animationOffset.x }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: animationOffset.x }}
        transition={{ duration: 0.3 }}
      >
        {conv.title}
      </motion.div>
    ))}
  </AnimatePresence>
);

export default ConversationList;
