import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { WeatherWidgetData } from "./types";

interface WidgetFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (widget: WeatherWidgetData) => void;
}

const WidgetFormModal: React.FC<WidgetFormModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [location, setLocation] = useState("Bengaluru");
  const [temperature, setTemperature] = useState(25);
  const [condition, setCondition] = useState("Sunny");

  const defaultState = () => {
    setLocation("Bengaluru");
    setTemperature(25);
    setCondition("Sunny");
  };

  const handleSave = () => {
    if (location === "") return;
    const newWidget: WeatherWidgetData = {
      location,
      temperature,
      condition,
    };

    onSave(newWidget);
    onClose();
    defaultState();
  };

  const handleClose = () => {
    onClose();
    defaultState();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Add Weather Widget
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Location"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Temperature"
          type="number"
          fullWidth
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Condition</InputLabel>
          <Select
            value={condition}
            onChange={(e) => setCondition(e.target.value as string)}
            label="Condition"
          >
            <MenuItem value="Sunny">Sunny</MenuItem>
            <MenuItem value="Cloudy">Cloudy</MenuItem>
            <MenuItem value="Rainy">Rainy</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetFormModal;
