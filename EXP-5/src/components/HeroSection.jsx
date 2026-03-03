import { Box, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: "200px",
        background: "linear-gradient(to right, #1976d2, #42a5f5)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 4,
      }}
    >
      <Typography variant="h4">Welcome Back 👋</Typography>
      <Typography variant="subtitle1">
        Here’s what’s happening with your business today.
      </Typography>
    </Box>
  );
}
