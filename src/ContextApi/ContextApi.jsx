import { createContext, useState, useEffect, useReducer } from 'react'
import {toast} from 'react-hot-toast'

export const  AppContext=createContext();
const initialState={
    cart:[],
}
function reducer(state,action){
    switch(action.type){
        case "ADD_CART":
            return{
                ...state,
                cart:[...state.cart,action.payload]
            }
        case "DELETE_CART":
            return{
                ...state,
                cart:state.cart.filter((item)=>item.id!==action.payload)
            }
        default:
            return state;
    }
}
export const AppContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)//for spinning or loader 
    const [products,setProduct]=useState([])//store all the products
    const [state,dispatch]=useReducer(reducer,initialState)
    // const [cart,setCart]=useState([])
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
        // cart,
        // setCart
        cart:state.cart,
        dispatch
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}