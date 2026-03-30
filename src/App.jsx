import { useContext, useEffect, useState } from 'react'
import { NavLink, Route, Routes,Navigate,useSearchParams } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import logo from "./assets/logo.jpg"
import { FaUserCircle } from "react-icons/fa";
import Login from './components/Login';

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
  const sort=searchParam.get('sort')||""
  const category=searchParam.get('category')||""

  function changeHandler(e){
    const val=e.target.value
    setSearchParam((prev)=>{
      const newSearch=new URLSearchParams(prev);
      if(val){
        newSearch.set('item',val)
      }
      else{
        newSearch.delete('item')
      } 
      return newSearch;
    }) 
  }

  let filteredProduct=products.filter((product)=>{
    const matchesSearch= product.title.toLowerCase().includes(item.toLowerCase())
    const categoryFilter=category===""||product.category===category
    return matchesSearch && categoryFilter
})

  function handleSort(e){
    const val=e.target.value;
    setSearchParam((prev)=>{
      const newSort=new URLSearchParams(prev);
      if(val){
        newSort.set('sort',val)
      }
      else{
        newSort.delete('sort');
      }
      return newSort
    })
  }

  if(sort==='low'){
    filteredProduct=[...filteredProduct].sort((a,b)=>a.price-b.price)
  }
  if(sort==='high'){
    filteredProduct=[...filteredProduct].sort((a,b)=>b.price-a.price)
  }

  //get all categories
  const categories=["All",...new Set(products.map((product)=>product.category))]
  function categoryHandler(e){
    const val=e.target.value;
    setSearchParam((prev)=>{
      const newCategory=new URLSearchParams(prev);
      if(val){
        newCategory.set('category',val)
      }
      else{
        newCategory.delete('category')
      }
      return newCategory
    })
  }



  return (
    <div className=' flex flex-col w-full '>
      <div className='w-full bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-500 text-slate-900 shadow-md sticky top-0 z-50'>
  <div className='max-w-[1200px] mx-auto flex items-center justify-between px-6 py-3 gap-x-4'>
    
    {/* 1. Left Section: Logo & Brand */}
    <div className='flex items-center gap-x-6'>
      <NavLink to="/">
        <img src={logo} alt='logo' className='w-12 h-12 cursor-pointer rounded-full border-2 border-white/50 hover:scale-110 transition-transform' />
      </NavLink>
      
      <div className='flex gap-x-2'>
        <NavLink to="/home" className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white/30 text-white' : 'hover:bg-white/20'}`}>
          Home
        </NavLink>
        <NavLink to="/cart" className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white/30 text-white' : 'hover:bg-white/20'}`}>
          Cart
        </NavLink>
      </div>
    </div>

    {/* 2. Middle Section: Search Bar */}
    <div className='flex-grow max-w-md mx-4'>
      <div className='relative group'>
        <input 
          type='text' 
          placeholder={`Search ${words[index]}...`} 
          className='w-full px-5 py-2 outline-none bg-white/90 backdrop-blur-sm shadow-inner text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-600 rounded-full transition-all'
          onChange={changeHandler}
        />
      </div>
    </div>

    {/* 3. Right Section: Filters & User */}
    <div className='flex items-center gap-x-4 shrink-0'>
      {/* Price Sort */}
      <div className='flex flex-col text-[10px] font-bold uppercase tracking-wider'>
        <span className='ml-1 opacity-70'>Price</span>
        <select onChange={handleSort} value={sort} className='bg-transparent border-b border-slate-900 outline-none cursor-pointer font-semibold'>
          <option value="">Default</option>
          <option value="low">Low-High</option>
          <option value="high">High-Low</option>
        </select>
      </div>

      {/* Category Sort */}
      <div className='flex flex-col text-[10px] font-bold uppercase tracking-wider'>
        <span className='ml-1 opacity-70'>Category</span>
        <select onChange={categoryHandler} value={category} className='bg-transparent border-b border-slate-900 outline-none cursor-pointer font-semibold'>
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "" : cat}>
              {typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All"}
            </option>
          ))}
        </select>
      </div>

      {/* Login Icon */}
      <NavLink to="/login" className='hover:scale-110 transition-transform ml-2'>
        <FaUserCircle className='w-8 h-8 text-slate-800 hover:text-purple-800 transition-colors' />
      </NavLink>
    </div>

  </div>
</div>
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/home" element={<Home filteredProduct={filteredProduct}/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/item/:id" element={<Card/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
