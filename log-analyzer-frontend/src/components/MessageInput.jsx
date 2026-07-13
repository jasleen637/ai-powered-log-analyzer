import { Paper, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function MessageInput() {
  return (
    <Paper
      elevation={3}
      sx={{
        m: 2,
        p: 1,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        placeholder="Ask me anything..."
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
      />

      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default MessageInput;