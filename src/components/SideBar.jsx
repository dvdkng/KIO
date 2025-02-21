import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaPlus, FaXmark } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { publish } from "../helper/event";
import Modal from "./Modal";
import AssistantList from "./AssistantList";
import ConversationList from "./ConversationList";

const animationOffset = { x: 5 };

const SideBar = () => {
  const [assistants, setAssistants] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeAssistant, setActiveAssistant] = useState(null);
  const [activeConv, setActiveConv] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const [menuOpen, setMenuOpen] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const newHeight = `${textareaRef.current.scrollHeight}px`;
      setTextareaHeight(newHeight);
      textareaRef.current.style.height = newHeight;
    }
  }, [prompt]);

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
          setConv(data[0]);
        }
      })
      .catch((error) => console.error("Cannot load conversations:", error));
  };

  const handleNewConv = () => {
    console.log("New conv", activeAssistant);
  };

  const setConv = (conversation) => {
    setActiveConv(conversation);
    publish("onChatChange", { id: conversation.id });
  };

  const handleConvClick = (conversation) => {
    setMenuOpen(false);
    setConv(conversation);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden fixed top-5 left-5 z-10 rounded-full bg-neutral-700 p-3"
      >
        <FaBars />
      </button>

      <div
        className={`md:relative fixed top-0 left-0 h-full w-full md:w-[30%] md:min-w-[250px] md:border-2 border-neutral-400 md:rounded-2xl  overflow-y-scroll scrollbar-hide md:z-0 z-50 bg-neutral-800 duration-200
      ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
      >
        <div className="pl-5 pr-3 md:py-1 py-3 flex md:justify-between justify-center items-center overflow-x-hidden relative">
          <img className="h-5 my-3" src={logo} alt="logo" />

          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden flex absolute justify-center items-center  h-9 w-9 bg-neutral-700 rounded-full left-5 top-5"
          >
            <FaXmark />
          </button>

          {activeAssistant !== null && (
            <button
              onClick={handleNewConv}
              className="md:flex hidden group p-[11px] bg-neutral-700 relative rounded-full cursor-pointer  justify-end items-center overflow-hidden h-9 w-9 duration-100 hover:w-40"
            >
              <span className="absolute right-8 text-neutral-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-nowrap">
                New Conversation
              </span>
              <FaPlus />
            </button>
          )}
        </div>

        <Divider />

        <AssistantList
          animationOffset={animationOffset}
          active={activeAssistant}
          assistants={assistants}
          onAssistantClick={handleSetAssistant}
          openModal={openModal}
        />
        <Divider />

        <ConversationList
          animationOffset={animationOffset}
          conversations={conversations}
          activeConv={activeConv}
          onConvClick={handleConvClick}
        />

        <div className="md:hidden flex absolute bottom-5 right-5">
          {activeAssistant !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              onClick={handleNewConv}
              className="bg-orange-500 flex justify-center items-center relative rounded-full cursor-pointer overflow-hidden h-9 w-9"
            >
              <FaPlus />
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={"Custom Prompt"}
          >
            <>
              <p>
                Description ... Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr.
              </p>
              <textarea
                rows={1}
                ref={textareaRef}
                placeholder="custom prompt ..."
                value={prompt}
                onInput={(e) => setPrompt(e.target.value)}
                style={{ height: textareaHeight }}
                className="bg-neutral-700 px-4 py-2 rounded outline-none w-full placeholder:text-neutral-400 resize-none"
                type="text"
              />
            </>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

const Divider = () => (
  <div className="w-full md:h-0.5 md:bg-neutral-400 bg-neutral-700 h-px" />
);

export default SideBar;
