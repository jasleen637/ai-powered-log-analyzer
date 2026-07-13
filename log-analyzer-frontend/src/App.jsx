import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
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

      <ChatWindow />

      <MessageInput />
    </Box>
  );
}

export default App;