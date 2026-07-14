import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  // Load previous conversation from sessionStorage
  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem("chat_messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  // Save conversation whenever messages change
  useEffect(() => {
    sessionStorage.setItem(
      "chat_messages",
      JSON.stringify(messages)
    );
  }, [messages]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (id, updates) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      )
    );
  };

  const clearChat = () => {
    setMessages([]);
    sessionStorage.removeItem("chat_messages");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f5f5",
      }}
    >
      <Navbar clearChat={clearChat} />

      <ChatWindow messages={messages} />

      <MessageInput
        messages={messages}
        addMessage={addMessage}
        updateMessage={updateMessage}
      />
    </Box>
  );
}

export default App;