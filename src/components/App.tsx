import "../styles/app.scss";
import Header from "./layout/Header.Component";
import Footer from "./layout/Footer.Component";
import VolleyballTools from "./VolleyballTool/VolleyballTool.Component";

/**
 * Main App component
 * @returns Main App component
 */
const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        <VolleyballTools />
      </div>
      <Footer />
    </div>
  );
};

export default App;
