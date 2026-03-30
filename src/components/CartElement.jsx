import { CiShoppingCart } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../ContextApi/ContextApi";


const CartElement=(props)=>{
    const product=props.item

    // const {cart,setCart}=useContext(AppContext)

    //reducer
    const {cart,dispatch}=useContext(AppContext);


    // const [remove,setRemove]=useState(false)//to toggle the add or remove button
    // function cartRemover(){
    //     //remove from cart
    //     const productToBeRemoved=cart.find((item)=>item.id===product.id)
    //     if(productToBeRemoved){
    //         const filteredCart=cart.filter((item)=>item.id!==product.id);
    //         setCart(filteredCart)
    //         toast.error("Removed from Cart")
    //     }
    // }

    return(
        <div className="min-h-[90%] flex flex-col justify-center border-[2px] gap-y-2 p-4
        hover:scale-105 transition-all duration-300 ease-in hover:shadow-lg border-slate-200 gap-3  ">
            <p className=" font-bold mb-1 text-gray-700 text-md text-left truncate">{product.title.split(" ").slice(0,10).join(" ")+"..."}</p>
            <div className="h-[180px]">
                <img className="h-full w-full object-contain mt-1 mb-1" src={product.image} alt="img"  />
            </div>

            <div className="w-full flex flex-col items-center mt-5">
                <p className="text-green-600 font-semibold">${product.price}</p>
                <p className="p-2 font-semibold text-blue-500">Category:{product.category}</p>
                <p className="p-1 font-semibold text-red-400">Rating:{product?.rating?.rate}</p>
                <p className="font-bold mb-1 text-gray-700 text-sm line-clamp-2 text-left  ">{product.description.split(" ").slice(0,10).join(" ")+"..."}</p>
            </div>

            <button className="mx-auto  rounded-full h-[30px] w-[85%] flex mb-2 justify-center items-center border  hover:shadow-lg hover:scale-105
                hover:text-slate-100 hover:bg-slate-800 transition-all duration-300 ease-in pb-1" 
                onClick={()=>dispatch({type:"DELETE_CART",payload:product.id})}>
                    Remove from Cart<CiShoppingCart className="mt-[6px]"/>
            </button>
            
            <NavLink to={`/item/${product.id}`} className="flex justify-center">
                <button className="mb-1 text-gray-700 uppercase border-2 rounded-full font-semibold
                text-[12px] p-1 px-3 hover:bg-gray-700 hover:text-white transition duration-300 ease-in">Click to view more</button>
            </NavLink>
        </div>
    );
}

export default CartElement