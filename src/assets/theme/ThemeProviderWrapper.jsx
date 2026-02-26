import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16a34a", // Tailwind green-600
    },
  },
});

export default function CustomTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}