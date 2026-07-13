import { useRef, useState } from "react";
import {
  Paper,
  TextField,
  IconButton,
  Box,
  Chip,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { analyzeLogs } from "../service/api";

function MessageInput() {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedFile) {
      return;
    }

    try {
      const formData = new FormData();

      if (message.trim()) {
        formData.append("logs", message);
      }

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await analyzeLogs(formData);

      console.log("Backend Response:", response);

      // TODO:
      // Add the response to your chat window

      setMessage("");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error calling /analyze:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        m: 2,
        p: 2,
        borderRadius: 4,
      }}
    >
      {selectedFile && (
        <Box sx={{ mb: 1 }}>
          <Chip
            icon={<AttachFileIcon />}
            label={selectedFile.name}
            onDelete={handleRemoveFile}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          hidden
          type="file"
          ref={fileInputRef}
          accept=".txt,.log,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
        />

        <IconButton onClick={() => fileInputRef.current.click()}>
          <AttachFileIcon />
        </IconButton>

        <TextField
          fullWidth
          variant="standard"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!message.trim() && !selectedFile}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default MessageInput;