import { use, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [fromCurrency, setFromCurrency] = useState("Select");
  const [toCurrency, setToCurrency] = useState("Select");
  const [countryList, setCountryList] = useState([]);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=currencies")
      .then((response) => response.json())
      .then((data) => {
        const tempList = data
          .map((country, index) => {
            const entries = Object.entries(country.currencies);
            if (entries.length === 0) return null;
            const [currencyCode, currency] = entries[0];
            return {
              currencyCode,
              currencyName: currency.name,
              currencySymbol: currency.symbol,
            };
          })
          .filter(Boolean); //this filter is to remove null values

        //Remove the redundant currency codes
        const tempArr = new Set();
        const filteredCurrency = tempList.filter(({ currencyCode }) => {
          if (tempArr.has(currencyCode)) return false;
          tempArr.add(currencyCode);
          return true;
        });
        setCountryList(filteredCurrency);
      });
  }, []);

  const getConversionRate = async () => {
    // This function gets the conversion rates and calculates the amount
    try {
      if (fromCurrency && toCurrency !== "Select") {
        await fetch("https://open.er-api.com/v6/latest/" + fromCurrency)
          .then((response) => response.json())
          .then((data) => {
            const rate = data.rates[toCurrency];
            const convertedAmount = (fromAmount * rate).toFixed(2);
            setToAmount(convertedAmount);
          });
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  return (
    <>
      <div class="w-xl py-7 bg-cardColor font-outfit rounded shadow-xl">
        <div class="grid grid-cols-6 gap-y-5 justify-items-stretch">
          <div class="col-span-4 col-start-2 pb-8 justify-self-center">
            <p class="text-3xl font-bold">CURRENCY CONVERTER</p>
          </div>
          <div class="col-start-2 col-end-3 justify-self-end">
            <div class="text-xl font-bold">FROM : </div>
          </div>
          <div class="col-start-3 col-end-6">
            <select
              id="currency"
              value={fromCurrency}
              onChange={(e) => { setFromCurrency(e.target.value); setToAmount(0); }}
              class="text-xl"
            >
              <option value="Select">-- SELECT --</option>
              {countryList.map((currency, index) => {
                return (
                  <option key={index} value={currency.currencyCode}>
                    ({currency.currencySymbol}) - {currency.currencyName}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="col-start-2 col-end-3 justify-self-end">
            <div class="text-xl font-bold">TO : </div>
          </div>
          <div class="col-start-3 col-end-6">
            <select
              id="currency"
              value={toCurrency}
              onChange={(e) => {setToCurrency(e.target.value); setToAmount(0);}}
              class="text-xl"
            >
              <option value="Select">-- SELECT --</option>
              {countryList.map((currency, index) => {
                return (
                  <option key={index} value={currency.currencyCode}>
                    ({currency.currencySymbol}) - {currency.currencyName}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="col-start-2 col-end-3 justify-self-start">
            <div class="text-xl font-bold">ENTER AMOUNT :</div>
          </div>
          <div class="col-start-3 col-end-6 justify-self-start pl-7">
            <input
              type="number"
              placeholder="Enter Amount"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              class="text-xl"
            />
          </div>
          <div class="col-span-4 col-start-2">
            <button class="text-xl font-bold bg-btnColor" onClick={() => getConversionRate()}>
              CONVERT
            </button>
          </div>
          <div class="col-span-4 col-start-2">
            <p class="text-2xl font-bold">
             {(toAmount != 0) ? `${fromAmount} ${fromCurrency} = ${toAmount} ${toCurrency}` : " "} 
            </p>
            {/* <input
              type="number"
              placeholder="0"
              value={toAmount}
              class="text-xl"
            /> */}
          </div>
          <div class="col-span-4 col-start-2">
          <a href="https://www.exchangerate-api.com">
            Rates By Exchange Rate API
          </a>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
