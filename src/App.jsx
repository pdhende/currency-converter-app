import { use, useEffect, useState } from 'react'
import './App.css'

function App () {
  const [fromCurrency, setFromCurrency] = useState('Select');
  const [toCurrency, setToCurrency] = useState('Select');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [ratesList, setRatesList] = useState(0);

  function getExchangeRate(fromCurrency, toCurrency) {
      // Fetch exchange rates
      console.log("inside getExchangeRate");
      if(fromCurrency && toCurrency !== 'Select') {
      fetch('https://open.er-api.com/v6/latest/' + fromCurrency)
        .then(response => response.json())
        .then(data => {
          setRatesList(data.rates)
          console.log(data)
        })}
  }

  return (
    <>
      <div>
        <h1>Currency Converter</h1>
      </div>
      <div className='card'>
        <div>
          <h2>From :</h2>
          <select
            id='currency'
            value={fromCurrency}
            onChange={e => setFromCurrency(e.target.value)}
          >
            <option value='Select'>--Select--</option>
            <option value='USD'>United States Dollar</option>
            <option value='INR'>Indian Rupees</option>
          </select>
        </div>
        <div>
          <h2>To :</h2>
          <select
            id='currency'
            value={toCurrency}
            onChange={e => setToCurrency(e.target.value)}
          >
            <option value='Select'>--Select--</option>
            <option value='INR'>Indian Rupees</option>
            <option value='USD'>United States Dollar</option>
          </select>
          </div>
        <div><input
            type='number'
            placeholder='Enter Amount'
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
          />
          <button onClick={() => getExchangeRate(fromCurrency, toCurrency)}>Convert</button>
          </div>
          <div>
          <input type='number' placeholder='0' value={toAmount} />
        </div>
        <a href='https://www.exchangerate-api.com'>
          Rates By Exchange Rate API
        </a>
      </div>
    </>
  )
}

export default App;
