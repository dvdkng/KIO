import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col bg-neutral-800 rounded-2xl max-w-96 w-3/4"
      >
        <div className="px-8 py-5">
          <p className="font-semibold text-xl">{title}</p>
        </div>

        <div className="w-full h-px bg-neutral-700" />

        <div className="px-8 py-5 flex flex-col gap-5">
          {children}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1 rounded bg-neutral-700 cursor-pointer w-full"
            >
              Cancel
            </button>

            <button className="px-4 py-1 rounded bg-orange-500 cursor-pointer w-full">
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
