import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

export default function Contact() {
  return (
    <>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Support
        </Typography>

        <Box sx={{ maxWidth: 500 }}>
          <TextField fullWidth label="Name" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="normal"
          />

          <Button variant="contained" sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
