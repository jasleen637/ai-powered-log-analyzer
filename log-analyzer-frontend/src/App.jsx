import { useState } from "react";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([]);

  // Add a new message
  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  // Update an existing message (used for "Thinking...")
  const updateMessage = (id, updates) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? { ...msg, ...updates }
          : msg
      )
    );
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
      <Navbar />

      <ChatWindow messages={messages} />

      <MessageInput
        addMessage={addMessage}
        updateMessage={updateMessage}
      />
    </Box>
  );
}

export default App;