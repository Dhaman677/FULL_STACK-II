import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

export default function Projects() {
  return (
    <>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Analytics Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Traffic</Typography>
                <Typography>Website visits increased by 25%</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Conversion Rate</Typography>
                <Typography>Current conversion: 3.8%</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Performance</Typography>
                <Typography>System uptime: 99.9%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
