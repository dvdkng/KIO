import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";

const initialAssistants = [
  {
    name: "Assistent 1",
    active: true,
    open: true,
    conversations: [
      { id: "abc", title: "my 1st conversation" },
      { id: "cba", title: "very very very loooo-oooong title" },
      { id: "bca", title: "short title" },
    ],
  },
  {
    name: "Assistent 2",
    active: false,
    open: false,
    conversations: [
      { id: "123", title: "other conversation" },
      { id: "321", title: "conversation xyz" },
    ],
  },
  {
    name: "Assistent 3",
    active: false,
    open: false,
    conversations: [{ id: "xxx", title: "closed conversation" }],
  },
  {
    name: "Assistent 4",
    active: false,
    open: false,
    conversations: [
      { id: "001", title: "conv. 1" },
      { id: "002", title: "conv. 2" },
      { id: "003", title: "conv. 3" },
      { id: "004", title: "conv. 4" },
      { id: "005", title: "conv. 5" },
      { id: "006", title: "conv. 6" },
      { id: "007", title: "conv. 7" },
      { id: "008", title: "conv. 8" },
      { id: "009", title: "conv. 9" },
      { id: "010", title: "conv. 10" },
    ],
  },
];


const SideBar = () => {
  const [assistants, setAssistants] = useState(initialAssistants);

  const toggleAssistant = (index) => {
    setAssistants((prevAssistants) =>
      prevAssistants.map((assistent, i) =>
        i === index
          ? { ...assistent, open: !assistent.open, active: !assistent.open }
          : assistent
      )
    );
  };

  return (
    <div className="h-full w-[20%] min-w-[300px] border-2 border-neutral-400 rounded-2xl overflow-y-scroll scrollbar-hide">
      {assistants.map((assistent, i) => (
        <div key={i}>
          <div
            className={`w-full py-3 px-5 cursor-pointer flex items-center justify-between ${
              assistent.active ? "bg-neutral-700 text-white" : ""
            }`}
            onClick={() => toggleAssistant(i)}
          >
            <span className="truncate">{assistent.name}</span>
            <FaAngleDown
              className={`transition-transform duration-300 ${
                assistent.open ? "rotate-180" : ""
              }`}
            />
          </div>

          <ExpandableSection isOpen={assistent.open}>
            {assistent.conversations.map((conversation, j) => (
              <Conversation
                key={j}
                id={conversation.id}
                title={conversation.title}
              />
            ))}
          </ExpandableSection>
        </div>
      ))}
    </div>
  );
};

const ExpandableSection = ({ isOpen, children }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [children]);

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

const Conversation = ({ id, title }) => {
  return (
    <div className="w-full py-3 px-10 cursor-pointer truncate">
      <span>{title}</span>
    </div>
  );
};

export default SideBar;
