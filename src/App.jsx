import { useContext, useEffect, useState } from 'react'
import { NavLink, Route, Routes,useSearchParams } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import logo from "./assets/logo.jpg"
// import './App.css'
import './index.css'
import { AppContext } from './ContextApi/ContextApi';
import Card from './components/Card';
const words=["Shirts","Pants","Bags","Rings","Bracelets","Mobile",]
function App() {
  const {loading,products}=useContext(AppContext)
  //used for changing the value of placeholder of search
  const [index,setIndex]=useState(0);

  //the code comes out of setInterval when words.length is changed and it re-renders so till it is changed it is 
  //executing setIntrval
  useEffect(()=>{
    const interValid=setInterval(()=>{
      setIndex((prevIndex)=>(prevIndex+1)%words.length)
    },2000)
    return()=>clearInterval(interValid)
  },[words.length])
  
  // for(let i=0;i<=6;i++){
  //   if(index>5) index=0;
  //   setIndex(index+1)
  // }
  
  //useSearchPArams
  const [searchParam,setSearchParam]=useSearchParams();
  const item=searchParam.get('item')||"";
  const filteredProduct=products.filter((product)=>
    product.title.toLowerCase().includes(item.toLowerCase())
  )
  function changeHandler(e){
    const val=e.target.value
    if(val){
      setSearchParam({item:val})
    }
    else{
      setSearchParam({})
    }
  }

  return (
    <div className=' flex flex-col w-full'>
      <div className='mb-4 flex justify-center gap-x-7 w-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-pink-300 via-fuchsia-400 to-purple-500 text-slate-900 pt-3 pb-4'>
        <div className='w-[20%] ml-4 flex justify-between'>
          <div>
            <NavLink to="/">
              <img src={logo} alt='logo' className='w-[50px] h-[50px] cursor-pointer rounded-full'/>
            </NavLink>
          </div>
          
          <NavLink to="/" >
            <button className='h-[100%] w-[70px] p-1 transition-all duration-300 
              hover:bg-[radial-gradient(circle,_var(--tw-gradient-stops))] 
            from-pink-500 via-purple-600 to-indigo-800 
            active:text-white font-semibold rounded-lg shadow-lg '>Home </button>
          </NavLink>
        </div>
        
        
        <NavLink to="/cart" className="">
          <button className='h-[100%] w-[70px] p-1 transition-all duration-300 
          hover:bg-[radial-gradient(circle,_var(--tw-gradient-stops))] 
        from-pink-500 via-purple-600 to-indigo-800 
        active:text-white font-semibold rounded-lg shadow-lg '>
            Cart
          </button>
        </NavLink>
        <div className=''>
          <label>
            <input type='text' placeholder={`Search ${words[index]}...`} className=' w-15% h-[80%] px-2 py-2 border-none
            outline-none bg-white/90 backdrop-blur-sm shadow-md text-gray-700 placeholder:text-gray-400
            focus:ring-2 focus:ring-purple-400 rounded-full transition-all duration-300' onChange={changeHandler}/>
          </label>
        </div>
      </div>
      <div className='flex-grow'>
        <Routes>
          <Route path="/" element={<Home filteredProduct={filteredProduct}/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/item/:id" element={<Card/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
