import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TextField } from "@mui/material";

export default function CustomCalendar({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        value={dayjs(value)}
        onChange={(newValue) => {
          if (newValue) {
            onChange(newValue.toDate());
          }
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "#f3f4f6", // Tailwind gray-100
              },
            },
          },
          actionBar: {
            actions: ["cancel", "accept"],
          },
        }}
      />
    </LocalizationProvider>
  );
}