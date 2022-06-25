import "./SignUp.css";

const SignUp = () => {
    return(
        <div className="flex w-full h-screen bg-violet-500">
            <div className="w-full flex  items-center justify-center ">
                <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
                    <h1 className="text-5xl font-semibold text-center">Sign Up</h1>
                    <p className="font-medium text-lg text-gray-500 mt-4 text-center">Please enter your information.</p>
                    <div className="mt-8">
                        <div>
                            <label className="text-lg font-medium">Email</label>
                            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                   placeholder='Enter your email'/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Password</label>
                            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                   placeholder='Enter your password' type="password"/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Phone</label>
                            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                   placeholder='Enter your password' type="password"/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Address</label>
                            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                   placeholder='Enter your password' type="password"/>
                        </div>

                        <div className="mt-8 flex flex-col gap-y-4">
                            <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out
                    py-3 rounded-2xl bg-violet-500 text-white text-lg font-bold">Sign up</button>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default SignUp