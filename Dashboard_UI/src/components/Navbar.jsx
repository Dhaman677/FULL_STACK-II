import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Reports</Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
