import "../styles/app.scss";
import Header from "./layout/Header.Component";
import Footer from "./layout/Footer.Component";
import VolleyballTools from "./VolleyballTool/VolleyballTool.Component";
import { MantineProvider } from "@mantine/core";

/**
 * Main App component
 * @returns Main App component
 */
const App = () => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <div className="app-container">
        <section className="screen-space">
          <Header />
          <div className="app-content">
            <VolleyballTools />
          </div>
        </section>
        <Footer />
      </div>
    </MantineProvider>
  );
};

export default App;
