import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEllipsis, FaPlus } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { publish } from "../helper/event";

const animationOffset = { x: 5 };

const AssistantList = ({ assistants, onAssistantClick, active }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);
  const toggleDropdown = (assistantId) => {
    setOpenDropdown(openDropdown === assistantId ? null : assistantId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      {assistants.map((assistant) => {
        return (
          <motion.div
            key={assistant.id}
            className={`w-full py-3 px-5 cursor-pointer flex justify-between items-center duration-100 ${
              assistant === active
                ? "bg-neutral-700 hover:bg-neutral-600"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
            onClick={() => onAssistantClick(assistant)}
            initial={{ opacity: 0, x: -animationOffset.x }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: animationOffset.x }}
            transition={{ duration: 0.3 }}
          >
            <span className="truncate">{assistant.name}</span>

            {assistant === active && (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="rounded-full p-0.5 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(assistant.id);
                  }}
                >
                  <FaEllipsis />
                </button>

                <AnimatePresence>
                  {openDropdown === assistant.id && (
                    <motion.div
                      initial={{ opacity: 1, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-1 w-48 bg-neutral-700 rounded-2xl border-2 border-neutral-400 overflow-hidden"
                    >
                      <div className="py-3 px-5 cursor-pointer truncate hover:bg-neutral-600 duration-100">
                        Option 1
                      </div>
                      <div className="py-3 px-5 cursor-pointer truncate hover:bg-neutral-600">
                        Option 2
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

const ConversationList = ({ conversations, activeConv, onConvClick }) => (
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

const SideBar = () => {
  const [assistants, setAssistants] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeAssistant, setActiveAssistant] = useState(null);
  const [activeConv, setActiveConv] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/assistents")
      .then((response) => response.json())
      .then((data) => setAssistants(data))
      .catch((error) => console.error("Cannot load assistants:", error));
  }, []);

  const handleSetAssistant = (assistant) => {
    setActiveAssistant(assistant);
    setActiveConv(null);

    fetch(`http://localhost:5000/conversations?assistantId=${assistant.id}`)
      .then((response) => response.json())
      .then((data) => {
        setConversations(data);
        if (data.length > 0) {
          handleConvClick(data[0]);
        }
      })
      .catch((error) => console.error("Cannot load conversations:", error));
  };

  const handleNewConv = () => {
    console.log("New conv", activeAssistant);
  };

  const handleConvClick = (conversation) => {
    setActiveConv(conversation);

    publish("onChatChange", { id: conversation.id });
  };

  return (
    <div className="h-full w-[20%] min-w-[300px] border-2 border-neutral-400 rounded-2xl overflow-y-scroll scrollbar-hide ">
      <div className="pl-5 pr-3 py-1 flex justify-between items-center overflow-x-hidden relative">
        <img className="h-5 my-3" src={logo} alt="logo" />

        {activeAssistant !== null && (
          <button
            onClick={handleNewConv}
            className="group p-[11px] bg-neutral-700 relative rounded-full cursor-pointer flex justify-end items-center overflow-hidden h-9 w-9 duration-100 hover:w-40"
          >
            <span className="absolute right-8  text-neutral-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-nowrap">
              New Conversation
            </span>

            <FaPlus />
          </button>
        )}
      </div>

      <div className="w-full h-0.5 bg-neutral-400" />

      <AssistantList
        active={activeAssistant}
        assistants={assistants}
        onAssistantClick={handleSetAssistant}
      />
      <div className="w-full h-0.5 bg-neutral-400" />

      <ConversationList
        conversations={conversations}
        activeConv={activeConv}
        onConvClick={handleConvClick}
      />
    </div>
  );
};

export default SideBar;
