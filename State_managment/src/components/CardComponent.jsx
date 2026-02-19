import { Card, CardContent, Typography } from "@mui/material";

export default function CardComponent({ title, value }) {
  return (
    <Card sx={{ textAlign: "center", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ marginTop: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
