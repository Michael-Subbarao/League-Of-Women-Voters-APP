import "./index.css";
import App from "./Components/App";
import { render } from "react-dom";

function lwvRep_renderComponent(address, apiKey) {
  render(
    <App address={address} apiKey={apiKey} />,
    document.getElementById("lwvrep_root")
  );
}
var originalFunction = lwvRep_renderComponent;
window.lwvRep_renderComponent = function (a, b) {
  try {
    var returnValue = originalFunction.call(this, a, b);
    return returnValue;
  } catch (e) {
    throw e;
  }
};
//lwvRep_renderComponent("AIzaSyBL9e9-Owc0soWpWw3tcLkF_uYcoyLvlwE", "165%20Main%20St%2C%20Annapolis%2C%20MD%2021401");
