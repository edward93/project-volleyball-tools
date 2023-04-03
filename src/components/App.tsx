import "../styles/app.scss";
import Header from "./layout/Header.Component";
import Footer from "./layout/Footer.Component";
import VolleyballTools from "./VolleyballTool/VolleyballTool.Component";
import { ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#020202",
      paper: "#020202",
    },

    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          fontSize: "0.8rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.8rem",
        },
      },
    },
  },
});

/**
 * Main App component
 * @returns Main App component
 */
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app-container">
        <Header />
        <div className="app-content">
          <VolleyballTools />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
