import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        marginTop: 6,
        padding: 2,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="body2">
        © 2026 Admin Dashboard | Built with React & MUI
      </Typography>
    </Box>
  );
}
