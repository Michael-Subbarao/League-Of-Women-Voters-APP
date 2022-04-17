import "./index.css";
import App from "./Components/RepFinderApp/App";
import AddressBar from "./Components/AddressBar/AddressBar"
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const rootElement = document.getElementById("lwvrep_root");
function lwvRep_renderAddressBar() {
  render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AddressBar/>} />
      <Route path="addressFilled" element={<App />} />
    </Routes>
    </BrowserRouter>,
    rootElement
  );
}

lwvRep_renderAddressBar()

//var originalFunction2 = lwvRep_renderAddressBar;
//
//window.lwvRep_renderAddressBar = function () {
//  try {
//    var returnValue = originalFunction2.call(this);
//    return returnValue;
//  } catch (e) {
//    throw e;
//  }
//};
////lwvRep_renderComponent("AIzaSyBL9e9-Owc0soWpWw3tcLkF_uYcoyLvlwE", "165%20Main%20St%2C%20Annapolis%2C%20MD%2021401");

