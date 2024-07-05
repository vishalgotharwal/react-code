import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect , useRef} from 'react';



function App() {
const [length , setlength] = useState(8)
const [numberallowed, setnumberallowd] = useState(false)

const [characterallowed, setcharacterallowd] = useState(false)
const[Password,setpassword]  =useState("")



//use ref hook

const passwordref = useRef(null)


const passwordGenerator  = useCallback(() =>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numberallowed) str+="0123456789"
  if(characterallowed) str+= "@#$%^&*"

  for(let i=1;i<=length;i++){
    let char   = Math.floor( Math.random()*str.length+ 1)
   pass += str.charAt(char)
  }


  setpassword(pass)
} , [length , numberallowed , characterallowed , setpassword])

const copypasswordtoclipboard  = useCallback(() =>  {
  passwordref.current?.select()

  window.navigator.clipboard.writeText(Password)
}, [Password])

useEffect(() => {
passwordGenerator()

} ,[length , numberallowed ,characterallowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
<h1 className='text-white text-center my-3'> Password generator</h1>
        <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={Password}
          className='outline-none w-full py-1 px-3 my-5 rounded'
          placeholder='password'
          readOnly
          ref = {passwordref}
          
          />

<button 
  onClick={copypasswordtoclipboard}
className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 my-3 rounded-lg mb-4'>Copy</button>

        </div>


           <div className='flex text-sm gap-x-2'></div>
           <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max = {100}
            value={length}
            className='cursor-pointer'
            onChange={(e) =>{setlength(e.target.value)}}
           />

           <label>length : {length}</label>

           <div className='flex items-center gap-x-1 '>
                 <input type="checkbox"  
                 defaultChecked ={numberallowed}
                 id='numberinput'
                 onChange={() =>{
                  setnumberallowd((prev) => !prev)
                 }}
                 
                 />
                 <label>Numbers</label>
           </div>


           <div className='flex items-center gap-x-1 '>
                 <input type="checkbox"  
                 defaultChecked ={characterallowed}
                 id='characterinput'
                 onChange={() =>{
                  setcharacterallowd((prev) => !prev)
                 }}
                 
                 />
                 <label>Characters</label>
           </div> 


                  

           </div>
          
       </div>
    </>
  );
}

export default App;
