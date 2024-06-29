'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/User";

export default function Signup() {
    const { error, loading, signup } = useUser();
    const [local_error, setLocalError] = useState(error);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        setLocalError(error);
    }
    , [error]);
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.email.trim() === "" || user.password.trim() === "") {
            setLocalError({ message: "Please fill all the fields", status: true });
            return
        }
        signup(user);
    }

    if (loading) return (
        <main className="w-full h-screen bg-white flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-t-0 border-indigo-600 rounded-full animate-spin">
                Loading...
            </div>
        </main>
    )

    return (
        <>
        {local_error.status && <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h3 className="text-red-600 text-2xl font-bold">Error</h3>
                    <p className="text-gray-600">{ local_error.message }</p>
                </div>
                <div className="mt-5">
                    <button
                        onClick={() => setLocalError({ message: "", status: false })}
                        className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>}
        <main className="w-full h-screen flex flex-col items-center bg-white justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <Image src="/swachh-logo.png" width={150} height={30} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                        <p className="">Already have an account? <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
                    </div>
                </div>
                <form
                    className="mt-8 space-y-5"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Create account
                    </button>
                </form>
                
            </div>
        </main>
        </>
    )
    }