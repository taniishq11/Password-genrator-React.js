
import { useState, useCallback, useEffect } from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*~{}[]()_-+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

const handleCopy = () => {
  navigator.clipboard.writeText(password);
  alert("Copied");
}

const handleRefresh = () => {
  passwordGenerator();
}

  return (
    <>
      <h1>Password Generator</h1>

      <div className='container'>
        <div className='display-content'>
          <input className='display' type="text"
            value={password}
            placeholder='password'
            readOnly
          />
         
          <button className='display' onClick={handleCopy}>Copy</button>
          <button className='display reload' onClick={handleRefresh}>↻</button>
        </div>
        <div className='addvalue'>
          <div className='range-content'>
            <input className='range' type="Range"
              min={6}
              max={16}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
            />

            <label htmlFor='range'> Length: {length}</label>
          </div>
          <div className='number-content'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput' >Numbers</label>
          </div>
          <div className='char-content'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='characterInput' >Characters</label>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
