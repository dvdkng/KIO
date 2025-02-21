import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaPaperclip, FaRegTrashCan } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
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
    if (images.length > 0) {
      console.log("images: ", images);
    }
    setPrompt("");
    setImages([]);
    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }
  };

  const handleAddImage = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newImages).then((results) => {
      setImages((prevImages) => [...prevImages, ...results]);
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full bg-neutral-800 rounded-2xl border-2 border-neutral-400 p-3 flex flex-col gap-2">
      <div className="flex gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-12 h-12 rounded-md bg-neutral-700 group"
          >
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-contain overflow-hidden rounded"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-neutral-700 border-4 border-neutral-800 rounded-full p-1 cursor-pointer duration-100"
            >
              <FaRegTrashCan size={10} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-end w-full">
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
              className="bg-orange-500 p-2 rounded-full  cursor-pointer"
            >
              <FaAngleRight />
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      <div className="flex justify-between items-center">
        <button
          onClick={handleAddImage}
          className="group p-2.5 bg-neutral-700 relative rounded-full cursor-pointer flex justify-start items-center overflow-hidden h-9 w-9 duration-100 hover:w-24"
        >
          <FaPaperclip />
          <span className="absolute left-8 text-neutral-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-nowrap">
            Add Files
          </span>
        </button>
        <input
          ref={imageInputRef}
          id="image-input"
          type="file"
          accept="image/*"
          multiple
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
  );
};

const Key = ({ children }) => {
  return <span className="bg-neutral-700 px-2 py-1 rounded">{children}</span>;
};

export default Prompt;
