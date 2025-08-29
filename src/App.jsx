import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
       <h1>Currency Converter</h1>
      </div>
      <div className="card">
        <h2>From :</h2>
        <input type="number" placeholder="Enter amount" />
        <h2>To :</h2>
        <input type="number" placeholder="" />
        <button onClick={() => setCount((count) => count + 1)}>
          Convert
        </button>
      </div>
    </>
  )
}

export default App
