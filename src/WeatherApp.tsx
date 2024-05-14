import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Grow } from "@mui/material";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AirIcon from "@mui/icons-material/Air";
import {
  Coffee,
  DarkMode,
  Opacity,
  Search,
  Speed,
  Thermostat,
  WbSunny,
} from "@mui/icons-material";
import CompressIcon from "@mui/icons-material/Compress";

import storm from "./Images/storm.png";
import drizzle from "./Images/drizzle.png";
import rain from "./Images/rainy.png";
import freeze from "./Images/freeze.png";
import snow from "./Images/snowy.png";
import clear from "./Images/sunny.png";
import cloud from "./Images/cloudy.png";
import wind from "./Images/wind.png";
import mist from "./Images/mist.png";
import ghost from "./Images/ghost.png";

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const API_KEY = "932a5070f56c162da81b2e63067f3c36";

  const [activeIndex, setActiveIndex] = useState(0);

  const stacks = [
    weatherData && (
      <Stack
        key={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <DeviceThermostatIcon />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.weather[0].main}
            </Typography>
            <Typography variant="caption">Weather</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <Coffee />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.main.feels_like}°c
            </Typography>
            <Typography variant="caption">Feels Like</Typography>
          </Stack>
        </Stack>
      </Stack>
    ),
    weatherData && (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <Opacity />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.main.humidity}%
            </Typography>
            <Typography variant="caption">Humidity</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <CompressIcon />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.main.pressure} hPa
            </Typography>
            <Typography variant="caption">Pressure</Typography>
          </Stack>
        </Stack>
      </Stack>
    ),
    weatherData && (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <Thermostat />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.main.temp_min}°c
            </Typography>
            <Typography variant="caption">Min Temp</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <Thermostat />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.main.temp_max}°c
            </Typography>
            <Typography variant="caption">Max Temp</Typography>
          </Stack>
        </Stack>
      </Stack>
    ),
    weatherData && (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <AirIcon />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.wind.speed}m/s
            </Typography>
            <Typography variant="caption">Speed</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <Speed />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {weatherData.wind.deg}°
            </Typography>
            <Typography variant="caption">Degree</Typography>
          </Stack>
        </Stack>
      </Stack>
    ),
    weatherData && (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <WbSunny />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Typography>
            <Typography variant="caption">Sunrise</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Stack>
            <DarkMode />
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Typography>
            <Typography variant="caption">Sunset</Typography>
          </Stack>
        </Stack>
      </Stack>
    ),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % stacks.length);
    }, 5000); // Change the duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [stacks.length]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        () => {
          const latitude = Math.random() * 180 - 90;
          const longitude = Math.random() * 360 - 180;
          fetchWeatherData(latitude, longitude);
        }
      );
    }
  }, []);

  const fetchWeatherData = async (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (location.trim() !== "") {
      fetchWeatherByLocation(location);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLocationSubmit({ preventDefault: () => {} });
    }
  };

  const fetchWeatherByLocation = async (location: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod && data.cod !== 200) {
        setError("Location not found. Please enter a valid location.");
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);
    }
  };

  const getImageForWeather = (weather: any) => {
    if (weather >= 200 && weather <= 240) {
      return storm;
    } else if (weather >= 300 && weather <= 330) {
      return drizzle;
    } else if (weather >= 500 && weather <= 540 && weather != 511) {
      return rain;
    } else if (weather == 511) {
      return freeze;
    } else if (weather >= 600 && weather <= 630) {
      return snow;
    } else if (weather == 800) {
      return clear;
    } else if (weather >= 801 && weather <= 804) {
      return cloud;
    } else if (weather == 741) {
      return wind;
    } else if (weather == 701) {
      return mist;
    } else {
      return wind;
    }
  };

  if (!weatherData) {
    return (
      <Stack gap={2} textAlign={"center"} sx={{ padding: "10px" }}>
        {error ? (
          <Stack gap={2}>
            <Box sx={{ width: "150px", height: "150px", alignSelf: "center" }}>
              <img
                src={ghost}
                style={{ width: "100%", objectFit: "contain" }}
                alt=""
                loading="lazy"
              />
            </Box>
            <Typography variant="body1">{error}</Typography>
          </Stack>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
          gap={1}
        >
          <TextField
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
            variant="standard"
            sx={{ color: "white" }}
            onKeyDown={handleKeyPress}
          />
          <Button
            type="button"
            variant="contained"
            onClick={handleLocationSubmit}
            sx={{
              borderRadius: "50px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <Search />
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack gap={2} textAlign={"center"} sx={{ padding: "10px" }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        gap={1}
      >
        <TextField
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
          variant="standard"
          onKeyDown={handleKeyPress}
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleLocationSubmit}
          sx={{
            borderRadius: "50px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <Search />
        </Button>
      </Stack>

      <Box sx={{ width: "150px", height: "150px", alignSelf: "center" }}>
        <img
          src={getImageForWeather(weatherData.weather[0].id)}
          style={{ width: "100%", objectFit: "contain" }}
          alt=""
        />
      </Box>

      <Typography variant="h4" gap={1}>
        {weatherData.main.temp}°c
      </Typography>

      <Typography variant="h6">
        {weatherData.name ? (
          <> {weatherData.name} </>
        ) : (
          <>
            {" "}
            {weatherData.coord.lon}, {weatherData.coord.lat}{" "}
          </>
        )}
      </Typography>

      <>
        {stacks.map((stack, index) => (
          <Grow key={index} in={index === activeIndex} timeout={500}>
            <Stack
              style={{ display: index === activeIndex ? "block" : "none" }}
            >
              {stack}
            </Stack>
          </Grow>
        ))}
      </>
    </Stack>
  );
};

export default WeatherComponent;