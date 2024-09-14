export interface WeatherWidgetData {
  location: string;
  temperature: number;
  condition: string;
}

export interface DashboardState {
  widgets: WeatherWidgetData[];
  unit: "C" | "F";
}
