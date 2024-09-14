import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTemperature } from "./TemperatureContext";
import { WeatherWidgetData } from "./types";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

interface WeatherWidgetProps {
  data: WeatherWidgetData;
  onRemove: () => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data, onRemove }) => {
  const { unit } = useTemperature();

  const temperature =
    unit === "C" ? data.temperature : (data.temperature * 9) / 5 + 32;

  const handleShowIcon = () => {
    if (data.condition === "Sunny") return <WbSunnyIcon fontSize="large" />;
    else if (data.condition === "Cloudy") return <CloudIcon fontSize="large" />;
    else if (data.condition === "Rainy")
      return <ThunderstormIcon fontSize="large" />;
    else return <WbSunnyIcon fontSize="large" />;
  };

  return (
    <Card
      sx={{
        backgroundColor: "#f0f4ff",
        color: "#333",
        borderRadius: 2,
        boxShadow: 3,
        position: "relative",
        paddingBottom: "16px",
        width: "100%",
      }}
    >
      <IconButton
        onClick={onRemove}
        aria-label="remove"
        sx={{
          position: "absolute",
          top: 10,
          right: 8,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
        }}
      >
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Typography variant="h6">{data.location}</Typography>
        <Typography variant="body1">
          Temperature: {temperature.toFixed(1)}°{unit}
        </Typography>
        <Typography variant="body2">Condition: {data.condition}</Typography>
        {handleShowIcon()}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
