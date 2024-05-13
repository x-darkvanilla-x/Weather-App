import WeatherApp from "./WeatherApp";

import { Box, Card, CardContent } from "@mui/material";

import AOS from "aos";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100svh",
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          background: "linear-gradient(135deg, #00feba, #5b548a)",
          borderRadius: "10px",
          color: "white",
        }}

        data-aos="fade"
      >
        <CardContent>
          <WeatherApp />
        </CardContent>
      </Card>
    </Box>
  );
};
