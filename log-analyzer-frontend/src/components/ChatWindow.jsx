import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";
import messages from "../data/messages";

function ChatWindow() {
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
        />
      ))}
    </Box>
  );
}

export default ChatWindow;