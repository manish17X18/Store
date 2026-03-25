import { NavLink } from "react-router-dom";



const CardItem=(props)=>{
    const product=props.product;
    
    return (
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
            <NavLink to={`/item/${product.id}`}>
                <button className="mb-1 text-gray-700 uppercase border-2 rounded-full font-semibold
                text-[12px] p-1 px-3 hover:bg-gray-700 hover:text-white transition duration-300 ease-in">Click to view more</button>
            </NavLink>
        </div>
    );
}

export default CardItem