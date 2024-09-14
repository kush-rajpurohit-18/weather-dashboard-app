import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import WeatherWidget from "./WeatherWidget";
import { WeatherWidgetData, DashboardState } from "./types";
import { useTemperature } from "./TemperatureContext";
import WidgetFormModal from "./WidgetFormModel";

const initialWeatherData: WeatherWidgetData = {
  location: "New York",
  temperature: 25,
  condition: "Sunny",
};

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<WeatherWidgetData[]>(() => {
    const savedState = localStorage.getItem("dashboardState");
    return savedState ? JSON.parse(savedState).widgets : [initialWeatherData];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { unit, toggleUnit } = useTemperature();

  useEffect(() => {
    const dashboardState: DashboardState = { widgets, unit };
    localStorage.setItem("dashboardState", JSON.stringify(dashboardState));
  }, [widgets, unit]);

  const addWidget = (widget: WeatherWidgetData) => {
    setWidgets([...widgets, widget]);
  };

  const removeWidget = (index: number) => {
    setWidgets(widgets.filter((_, i) => i !== index));
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        marginBottom={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsModalOpen(true);
          }}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add Weather Widget
        </Button>
        <Button
          variant="outlined"
          onClick={toggleUnit}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </Button>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        sx={{
          maxWidth: "1250px",
          width: "100%",
          "& > div": {
            flex: "1 1 300px",
            maxWidth: "300px",
            minWidth: "300px",
            "@media (max-width: 600px)": {
              minWidth: "100%",
            },
          },
        }}
      >
        {widgets.map((widget, index) => (
          <Box key={index}>
            <WeatherWidget data={widget} onRemove={() => removeWidget(index)} />
          </Box>
        ))}
      </Box>
      <WidgetFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addWidget}
      />
    </Box>
  );
};

export default Dashboard;
