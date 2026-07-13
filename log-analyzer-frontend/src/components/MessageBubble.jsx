import { Box, Paper, Typography } from "@mui/material";

function MessageBubble({ sender, text }) {
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
          maxWidth: "60%",
          borderRadius: 4,
        }}
      >
        <Typography>{text}</Typography>
      </Paper>
    </Box>
  );
}

export default MessageBubble;