const { createContext, useState, useEffect } = require("react");
import {toast} from 'react-hot-toast'


export default  AppContext=createContext();

export const AppContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)//for spinning or loader 
    const [product,setProduct]=useState([])//store all the products
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
        product,
        setProduct,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}