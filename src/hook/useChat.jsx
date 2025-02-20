import { useState, useEffect } from "react";

function useChat() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    fetch(`http://localhost:5000/conversations/${chatId}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.chat || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Err. cannot load chat:", err);
        setError(err);
        setLoading(false);
      });
  }, [chatId]);

  const sendMessage = (sender, content) => {
    if (!chatId) return;
    const newMessage = { sender, content };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];

      fetch(`http://localhost:5000/conversations/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: updatedMessages }),
      }).catch((err) => console.error("Err. cannot send:", err));
      return updatedMessages;
    });
  };

  return { chatId, setChatId, messages, loading, error, sendMessage };
}

export default useChat;
