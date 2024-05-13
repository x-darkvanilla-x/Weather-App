import WeatherApp from "./WeatherApp";

import { Box, Card, CardContent } from "@mui/material";

export const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <WeatherApp />
        </CardContent>
      </Card>
    </Box>
  );
};
