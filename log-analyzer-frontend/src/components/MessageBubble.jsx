import {
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

function MessageBubble({ sender, text, status }) {
  const isUser = sender === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          maxWidth: "65%",
          borderRadius: 4,
          bgcolor: isUser ? "#1976d2" : "#ffffff",
          color: isUser ? "#ffffff" : "#000000",
        }}
      >
        {status === "loading" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CircularProgress size={18} />
            <Typography>Thinking...</Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
            }}
          >
            {text}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default MessageBubble;