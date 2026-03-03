import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CardComponent from "../components/CardComponent";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <>
      
      <HeroSection />

      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
            <CardComponent title="Users" value="1,245" />
          </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CardComponent title="Revenue" value="₹85,000" />
          </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CardComponent title="Orders" value="320" />
          </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CardComponent title="Growth" value="+18%" />
          </Grid>
        </Grid>
      </Container>

      
    </>
  );
}
