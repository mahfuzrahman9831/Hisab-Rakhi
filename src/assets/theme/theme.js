import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16a34a", // green-600
    },
  },

  components: {
    MuiPickersToolbar: {
  styleOverrides: {
    root: {
      backgroundColor: "#16a34a",
      "& .MuiTypography-root": {
        color: "#ffffff",
      },
    },
  },
},

    MuiPickersToolbarText: {
      styleOverrides: {
        root: {
          color: "#ffffff !important", // make SELECT DATE white
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiPickersToolbarText-root": {
            color: "#ffffff",
          },
        },
      },
    },
  },
},

);



export default theme;