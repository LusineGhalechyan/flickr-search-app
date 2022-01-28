import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
//import Flickr from "flickr-sdk";
const s = () => {
  axios
    .get(
      "https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=cat,dog&api_key=ea1822c1928d8a968205c47a5e660d5a"
    )
    .then((res) => console.log(res.data));
};
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {s()}
        </a>
      </header>
    </div>
  );
}

export default App;
