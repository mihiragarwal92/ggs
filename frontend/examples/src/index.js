import React from "react";
import ReactDOM from "react-dom";
import Giphy from "../../src";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Upload your CSV file here!!</h1>
      <Giphy />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
