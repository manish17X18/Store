import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
    });

    function changeHandler(e) {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function submitHandler(e) {
        e.preventDefault();
        console.log(data);
        toast.success("Login Successful");
        navigate("/home");
    }

    return (
        // Main Container with soft background for eye comfort
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
                
                <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                    Welcome Back
                </h2>

                <form onSubmit={submitHandler} className="flex flex-col gap-y-4">
                    
                    {/* First and Last Name Grid */}
                    <div className="flex gap-x-4">
                        <label className="w-1/2">
                            <p className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">First Name <span className="text-red-500">*</span></p>
                            <input
                                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
                                type="text"
                                value={data.fname}
                                name="fname"
                                onChange={changeHandler}
                                placeholder="John"
                                required
                            />
                        </label>
                        <label className="w-1/2">
                            <p className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Last Name <span className="text-red-500">*</span></p>
                            <input
                                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
                                type="text"
                                value={data.lname}
                                name="lname"
                                onChange={changeHandler}
                                placeholder="Doe"
                                required
                            />
                        </label>
                    </div>

                    {/* Email Input */}
                    <label>
                        <p className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Email Address <span className="text-red-500">*</span></p>
                        <input
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
                            type="email"
                            value={data.email}
                            name="email"
                            onChange={changeHandler}
                            placeholder="example@mail.com"
                            required
                        />
                    </label>

                    {/* Phone Number */}
                    <label>
                        <p className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Phone Number <span className="text-red-500">*</span></p>
                        <input
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
                            type="tel"
                            value={data.phone}
                            name="phone"
                            onChange={changeHandler}
                            placeholder="1234567890"
                            pattern="[0-9]{10}"
                            required
                        />
                    </label>

                    {/* Password */}
                    <label>
                        <p className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Password <span className="text-red-500">*</span></p>
                        <input
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
                            type="password"
                            value={data.password}
                            name="password"
                            onChange={changeHandler}
                            placeholder="••••••••"
                            required
                        />
                    </label>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-purple-200 dark:shadow-none"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;