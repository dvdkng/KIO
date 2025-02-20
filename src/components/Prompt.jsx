import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaPaperclip, FaRegTrashCan } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const textareaRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("prompt: ", prompt);
    if (image) {
      console.log("image: ", image);
    }
    setPrompt("");
    setImage(null);
  };

  const handleAddImage = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    imageInputRef.current.value = null; 
  };

  return (
    <>
      <div className="bg-linear-0 from-neutral-800 to-transparent w-full h-30 absolute bottom-0 pointer-events-none" />
      <div className="absolute w-full bottom-0 bg-neutral-800 rounded-2xl border-2 border-neutral-400 p-3 flex flex-col gap-2">
        {image && (
          <div className="relative w-12 h-12 overflow-hidden rounded-md bg-neutral-700 group">
            <img
              src={image}
              alt="Image Preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-0.5 right-0.5 bg-neutral-800 rounded-full p-1 cursor-pointer group-hover:opacity-100 opacity-0 duration-100"
            >
              <FaRegTrashCan size={8} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex w-full">
          <textarea
            rows={1}
            onKeyDown={handleKeyDown}
            ref={textareaRef}
            placeholder="send a message to KIO ..."
            value={prompt}
            onInput={(e) => setPrompt(e.target.value)}
            className="pr-3 py-1.5 outline-none w-full placeholder:text-neutral-400 resize-none"
            type="text"
          />
          <AnimatePresence>
            {prompt.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                type="submit"
                className="bg-orange-500 p-2 rounded-full h-full cursor-pointer"
              >
                <FaAngleRight />
              </motion.button>
            )}
          </AnimatePresence>
        </form>

        <div className="flex justify-between items-center">
          <button
            onClick={handleAddImage}
            className="p-2 bg-neutral-700 rounded-full cursor-pointer"
          >
            <FaPaperclip />
          </button>
          <input
            ref={imageInputRef}
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <AnimatePresence>
            {prompt.length > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-neutral-400"
              >
                <Key>Shift</Key> + <Key>Enter</Key> to submit
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

const Key = ({ children }) => {
  return <span className="bg-neutral-700 px-2 py-1 rounded">{children}</span>;
};

export default Prompt;
