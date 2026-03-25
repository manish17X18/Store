import { createContext, useState, useEffect } from 'react'
import {toast} from 'react-hot-toast'

export const  AppContext=createContext();

export const AppContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)//for spinning or loader 
    const [products,setProduct]=useState([])//store all the products
    const [cart,setCart]=useState([])
    async function fetchProducts() {
        try{
            setLoading(true)
            const result=await fetch(`https://fakestoreapi.com/products`)
            const data=await result.json();
            setProduct(data)
            setLoading(false)
        }
        catch(e){
            toast.error("Error loading the Products");
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    const value={
        fetchProducts,
        loading,
        setLoading,
        products,
        setProduct,
        cart,
        setCart
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}