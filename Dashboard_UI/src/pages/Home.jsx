import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CardComponent from "../components/CardComponent";
import Footer from "../components/Footer";
import { Container, Grid } from "@mui/material";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <CardComponent title="Users" value="1,245" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardComponent title="Revenue" value="₹85,000" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardComponent title="Orders" value="320" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardComponent title="Growth" value="+18%" />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
