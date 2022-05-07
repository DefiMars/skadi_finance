import OlympusLogo from "../../assets/Olympus Logo.svg";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div id="not-found">
      <div className="not-found-header">
        <a href="https://skadi.finance" target="_blank">
          <img className="branding-header-icon" src={OlympusLogo} alt="SkadiFinance" />
        </a>

        <h4>
          "Page not found"
        </h4>
      </div>
    </div>
  );
}
