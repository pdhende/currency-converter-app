import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  return (
    <>
      <div>
        <h1>Currency Converter</h1>
      </div>
      <div className="card">
        <div classBorder="5px solid yellow">
          <h2>From :</h2>
          <select
            id="currency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Select">--Select--</option>
            <option value="USD">United States Dollar</option>
            <option value="INR">Indian Rupees</option>
          </select>
          <input type="number" placeholder="Enter Amount" />
        </div>
          <button>Convert</button>
        <div>
        <h2>To :</h2>
        <select
            id="currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Select">--Select--</option>
            <option value="INR">Indian Rupees</option>
            <option value="USD">United States Dollar</option>
          </select>
        <input type="number" placeholder="0" />
        </div>
      </div>
    </>
  );
}

export default App;
