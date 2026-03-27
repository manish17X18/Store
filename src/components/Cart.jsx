import { useContext } from "react";
import { AppContext } from "../ContextApi/ContextApi";
import Spinner from "./Spinner";
import CartElement from "./CartElement";



const Cart=()=>{
    const {cart,loading}=useContext(AppContext);
    return (
        <div>
            {
                loading?
                <Spinner/>
                :
                cart.length>0?
                
                <div className=" mx-auto max-w-[1050px] grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-x-5 gap-y-5">
                    {
                        cart.map((item)=>(
                        <div key={item.id}>
                            <CartElement item={item}/>
                        </div>
                    ))
                    }
                </div>
                    
                :
                <div className="flex justify-center items-center h-full">No Elements Found</div>
            }
        </div>
    );
}

export default Cart