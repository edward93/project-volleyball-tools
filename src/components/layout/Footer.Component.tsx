import "../../styles/footer.scss";

const FooterComponent = () => {
  return (
    <div className="footer-container">
      <div className="footer-app-info">
        <div className="footer-app-author">Designed and Made by Ed</div>
        <div className="footer-app-version">version {process.env.REACT_APP_VERSION}</div>
        <div className="footer-app-version">
          &copy; {new Date().getFullYear() === 2023 ? "2023" : `2023 - ${new Date().getFullYear()}`}
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
