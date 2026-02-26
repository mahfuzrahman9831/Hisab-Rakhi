import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TextField } from "@mui/material";
import CustomTheme from "./ThemeProviderWrapper";

export default function CustomCalendar() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <CustomTheme>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
      </LocalizationProvider>
    </CustomTheme>
  );
}