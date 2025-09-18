import './App.css';
import { useState } from 'react';
import { LC, NC, SC, UC } from './Data/PassChar';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let [uppercase , setuppercase]=useState(false)
  let [lowercase , setlowercase]=useState(false)
  let [number , setnumber]=useState(false)
  let [symbol , setsymbol]=useState(false)
  let [passwordlen, setpasswordlen] = useState(10)
  let [fPass , setPass] = useState('')

  function createPassword(){
    let finalPass=''
    let charSet=''
    if(uppercase||lowercase||number||symbol){
      if(uppercase) charSet+=UC;
      if(lowercase) charSet+=LC;
      if(number) charSet+=NC;
      if(symbol) charSet+=SC;
      for(let i=0;i<passwordlen;i++){
        finalPass+=charSet.charAt(Math.floor(Math.random()*charSet.length))
        setPass(finalPass)

      }
      
      

    }
    else{
      alert("Please select atleast 1 checkbox")
    }
  }

  let copyPass=()=>{
    navigator.clipboard.writeText(fPass)
    
  }
  return (
   <>
   <ToastContainer />
   <div className='passwordBox'>
    <h2> Password Generator</h2>
    <div className='passwordBoxIn'>
      <input type='text' readOnly value={fPass}  /><button onClick={() => {
          copyPass();
          toast.success("Password copied!");
        }} >Copy</button>
    </div>
    <div className='passLength'>
      <label>Password Length</label>
      <input type='number' value={passwordlen} onChange={(event)=>setpasswordlen(event.target.value)} max={20} min={10} />
    </div>

    <div className='passLength'>
      <label>Include Upper Case</label>
      <input type='checkbox'  checked={uppercase} onChange={()=>setuppercase(!uppercase)}/>
    </div>

    <div className='passLength'>
      <label>Include lowercase</label>
      <input type='checkbox' checked={lowercase} onChange={()=>setlowercase(!lowercase)}/>
    </div>

    <div className='passLength'>
      <label>Include Numbers</label>
      <input type='checkbox' checked={number} onChange={()=>setnumber(!number)}/>
    </div>

    <div className='passLength'>
      <label>Include Symbols</label>
      <input type='checkbox' checked={symbol} onChange={()=>setsymbol(!symbol)}/>
    </div>
    <button className='btn' onClick={() => {
    createPassword();
    toast.success("Password created!");}}x>Generate Password</button>

   </div>
   
   </>
  );
}

export default App;
