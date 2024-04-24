import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [number, setNumber] = useState(0);
  const [toggle, setToggle] = useState(true);

  const someFunc = useCallback(()=>{
    console.log(`someFunc : number =${number}`);
  },[number]
  );
  useEffect(()=>{
    console.log("someFunc이 변경되었습니다.");
  },[someFunc])

  const something = () =>{
    setToggle(!toggle);
  }

  return (
      
    <>
      <input onChange={(e)=>{setNumber(e.target.value)}}type="number" />
      <button onClick={something}>{toggle.toString()}</button>
      <br />
      <button onClick={someFunc}>Call someFunc</button>
    </>
  )
}


export default App
