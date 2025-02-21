import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEllipsis } from "react-icons/fa6";

const AssistantList = ({
  assistants,
  onAssistantClick,
  active,
  openModal,
  animationOffset,
}) => {
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
      {assistants.map((assistant) => (
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

          <div
            className={`relative ${
              active === assistant
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            ref={dropdownRef}
          >
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
                  className="absolute right-0 mt-1 w-48 bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden"
                >
                  <div
                    className="py-3 px-5 cursor-pointer truncate hover:bg-neutral-600 duration-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                      setOpenDropdown(null);
                    }}
                  >
                    Custom Prompt
                  </div>
                  <div className="py-3 px-5 cursor-pointer truncate hover:bg-neutral-600">
                    Option 2
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default AssistantList;
