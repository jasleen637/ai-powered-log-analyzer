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

function MessageInput({ addMessage, updateMessage }) {
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
    if (!message.trim() && !selectedFile) return;

    const currentMessage = message;
    const currentFile = selectedFile;

    // Show user message immediately
    addMessage({
      id: Date.now(),
      sender: "user",
      text: currentMessage || `📎 ${currentFile.name}`,
      status: "completed",
    });

    // Add "Thinking..." message
    const botId = Date.now() + 1;

    addMessage({
      id: botId,
      sender: "bot",
      text: "",
      status: "loading",
    });

    // Clear input immediately
    setMessage("");
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      const formData = new FormData();

      if (currentMessage.trim()) {
        formData.append("logs", currentMessage);
      }

      if (currentFile) {
        formData.append("image", currentFile);
      }

      const response = await analyzeLogs(formData);

      const analysis = response.analysis;

      const formattedResponse = `
📋 Summary

${analysis.summary}

🔍 Root Cause

${analysis.root_cause}

⚠️ Severity

${analysis.severity}

💡 Recommendations

${analysis.recommendations
        .map((item) => `• ${item}`)
        .join("\n")}
`;

      updateMessage(botId, {
        text: formattedResponse.trim(),
        status: "completed",
      });
    } catch (error) {
      console.error(error);

      updateMessage(botId, {
        text: "❌ Something went wrong while analyzing your request.",
        status: "completed",
      });
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
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
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