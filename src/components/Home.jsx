import { useContext } from "react";
import { AppContext } from "../ContextApi/ContextApi";
import Spinner from "./Spinner";
import { useSearchParams } from "react-router-dom";

import CardItem from "./CardItem";
const Home=(props)=>{
    const filteredProduct=props.filteredProduct
    const {loading,products}=useContext(AppContext)

    
    return(
        <div className="">
            {
                loading?
                <div className="flex justify-center items-center h-full">
                    <Spinner/>
                </div>
                    :
                    filteredProduct.length>0?
                    <div className=" mx-auto max-w-[1050px] grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-x-5 gap-y-5">
                        {filteredProduct.map((product)=>(
                            <div key={product.id} >
                                <CardItem product={product}/>
                            </div>
                        ))}
                    </div>
                :
                (
                    <div>No Products</div>
                )
            }
        </div>
    );
}
export default Home;