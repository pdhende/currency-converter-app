import { useEffect, useState } from 'react'
import './App.css'
import { getExchangeList, getConversionRate } from './services/fetchServices'
import { removeDuplicates } from './utils/removeDuplicates'

function App () {
  const [fromCurrency, setFromCurrency] = useState('Select')
  const [toCurrency, setToCurrency] = useState('Select')
  const [countryList, setCountryList] = useState([])
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)

  useEffect(() => {
    const tempList = async () => {
      try {
        const result = await getExchangeList();
        const filteredCurrency = await removeDuplicates(result);
        setCountryList(filteredCurrency);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    }
    tempList();
  }, [])

  return (
    <>
      <div class='w-xl py-7 bg-cardColor font-outfit rounded shadow-xl'>
        <div class='grid grid-cols-6 gap-y-5 justify-items-stretch'>
          <div class='col-span-4 col-start-2 pb-8 justify-self-center'>
            <p class='text-3xl font-bold'>CURRENCY CONVERTER</p>
          </div>
          <div class='col-start-2 col-end-3 justify-self-end'>
            <div class='text-xl font-bold'>FROM : </div>
          </div>
          <div class='col-start-3 col-end-6'>
            <select
              id='currency'
              value={fromCurrency}
              onChange={e => {
                setFromCurrency(e.target.value)
                setToAmount(0)
              }}
              class='text-xl'
            >
              <option value='Select'>-- SELECT --</option>
              {countryList.map((currency, index) => {
                return (
                  <option key={index} value={currency.currencyCode}>
                    ({currency.currencySymbol}) - {currency.currencyName}
                  </option>
                )
              })}
            </select>
          </div>
          <div class='col-start-2 col-end-3 justify-self-end'>
            <div class='text-xl font-bold'>TO : </div>
          </div>
          <div class='col-start-3 col-end-6'>
            <select
              id='currency'
              value={toCurrency}
              onChange={e => {
                setToCurrency(e.target.value)
                setToAmount(0)
              }}
              class='text-xl'
            >
              <option value='Select'>-- SELECT --</option>
              {countryList.map((currency, index) => {
                return (
                  <option key={index} value={currency.currencyCode}>
                    ({currency.currencySymbol}) - {currency.currencyName}
                  </option>
                )
              })}
            </select>
          </div>
          <div class='col-start-2 col-end-3 justify-self-start'>
            <div class='text-xl font-bold'>ENTER AMOUNT :</div>
          </div>
          <div class='col-start-3 col-end-6 justify-self-start pl-7'>
            <input
              type='number'
              placeholder='Enter Amount'
              value={fromAmount}
              onChange={e => {
                setFromAmount(e.target.value)
                setToAmount(0)
              }}
              class='text-xl'
            />
          </div>
          <div class='col-span-4 col-start-2'>
            <button
              class='text-xl font-bold bg-btnColor'
              onClick={async () => {
                try {
                  const toAmount = await getConversionRate(
                    fromCurrency,
                    toCurrency,
                    fromAmount
                  )
                  setToAmount(toAmount)
                } catch (error) {
                  console.error('Conversion failed:', error)
                }
              }}
            >
              CONVERT
            </button>
          </div>
          <div class='col-span-4 col-start-2'>
            <p class='text-2xl font-bold'>
              {toAmount != 0
                ? `${fromAmount} ${fromCurrency} = ${toAmount} ${toCurrency}`
                : ' '}
            </p>
          </div>
          <div class='col-span-4 col-start-2'>
            <a href='https://www.exchangerate-api.com'>
              Rates By Exchange Rate API
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
