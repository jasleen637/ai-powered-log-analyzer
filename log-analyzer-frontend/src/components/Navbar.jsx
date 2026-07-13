import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar
        position="static"
         sx={{
            backgroundColor: "#212121",
          }}>
      <Toolbar>
        <Typography variant="h6">
          Chatbot
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;