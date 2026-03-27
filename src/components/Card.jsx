import { useContext } from "react";
import { AppContext } from "../ContextApi/ContextApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const Card=()=>{
    
    const {products}=useContext(AppContext)
    const {id}=useParams()
    const navigate=useNavigate();
    const product = products.find((item) => item.id === Number(id));
    if(!product){
        return(
            <div>
                No Product found!!!
            </div>
        )
    }
    function goBackHandler(){
        navigate(-1);
    }
    return (
        <div
        tabIndex="0"
        className="flex flex-col h-full  justify-center items-center max-w-[40%] mx-auto p-4 focus:ring-2 hover:focus:ring-pink-400 outline-none">
            <p className=" font-bold mb-1 text-gray-700 text-md text-left">{product.title}</p>
            <div className="h-[180px]">
                <img className="h-full w-full object-contain mt-1 mb-1" src={product.image} alt="img"  />
            </div>
            <div className="w-full flex flex-col items-center mt-5">
                <p className="text-green-600 font-semibold">${product.price}</p>
                <p className="p-2 font-semibold text-blue-500">Category:{product.category}</p>
                <p className="p-1 font-semibold text-red-400">Rating:{product?.rating?.rate}</p>
                <p className="text-gray-700 dark:text-white font-semibold text-center">All you need to know about this Product</p>
                <p className="font-semibold mb-1 dark:text-gray-100 text-sm/6  text-left  ">{product.description}</p>
                <button onClick={goBackHandler} className="mt-2 w-[40%] h-[35px] focus:ring-2 
                outline-none bg-slate-100 text-slate-800 hover:scale-105 hover:shadow-2xl hover:bg-slate-800 hover:text-slate-100
                text-md text-center transition-all ease-in duration-300  rounded-full">Go Back</button>
            </div>
        </div>
    );
}
export default Card;