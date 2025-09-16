import { use, useEffect, useState } from 'react'
import './App.css'

function App () {
  const [fromCurrency, setFromCurrency] = useState('Select')
  const [toCurrency, setToCurrency] = useState('Select')
  const [countryList, setCountryList] = useState([])
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=currencies')
      .then(response => response.json())
      .then(data => {
        const tempList = data
          .map((country, index) => {
            const entries = Object.entries(country.currencies)
            if (entries.length === 0) return null
            const [currencyCode, currency] = entries[0]
            return {
              currencyCode,
              currencyName: currency.name,
              currencySymbol: currency.symbol
            }
          })
          .filter(Boolean); //this filter is to remove null values
        
          //Remove the redundant currency codes
        const tempArr = new Set();
        const filteredCurrency = tempList.filter(({ currencyCode }) => {
          if (tempArr.has(currencyCode)) return false;
          tempArr.add(currencyCode);
          return true;
        })
        setCountryList(filteredCurrency);
      })
  }, [])

  const getConversionRate = async () => {
    // This function gets the conversion rates and calculates the amount
    try {
      if (fromCurrency && toCurrency !== 'Select') {
        await fetch('https://open.er-api.com/v6/latest/' + fromCurrency)
          .then(response => response.json())
          .then(data => {
            const rate = data.rates[toCurrency]
            const convertedAmount = (fromAmount * rate).toFixed(2)
            setToAmount(convertedAmount)
          })
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
    }
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
            {countryList.map((currency, index) => {
              return (
                <option key={index} value={currency.currencyCode}>
                  ({currency.currencySymbol}) - {currency.currencyName}
                </option>
              )
            })}
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
             {countryList.map((currency, index) => {
              return (
                <option key={index} value={currency.currencyCode}>
                  ({currency.currencySymbol}) - {currency.currencyName}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <input
            type='number'
            placeholder='Enter Amount'
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
          />
          <button onClick={() => getConversionRate()}>Convert</button>
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

export default App
