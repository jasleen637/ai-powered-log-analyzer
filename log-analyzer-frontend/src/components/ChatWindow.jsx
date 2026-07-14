import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  // Automatically scroll whenever a new message is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 3,
      }}
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          sender={message.sender}
          text={message.text}
          status={message.status}
        />
      ))}

      {/* Invisible element used for auto-scroll */}
      <div ref={bottomRef} />
    </Box>
  );
}

export default ChatWindow;