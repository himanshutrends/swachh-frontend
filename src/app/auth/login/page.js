'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/User";
import Link from "next/link";

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    
    const [rememberMe, setRememberMe] = useState(false);
    const { login, error, loading } = useUser();
    const [local_error, setLocalError] = useState(error);

    useEffect(() => {
        setLocalError(error);
    }, [error]);

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
        login({ ...user, rememberMe });
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
        </div>
        }
        <main className="w-full h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-5">
                <div className="text-center pb-8">
                <Image src="/swachh-logo.png" width={150} height={30} className="mx-auto" alt="Swachh Logo" />
                <div className="mt-5">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                    </div>
                </div>
                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-3">
                            <input 
                                type="checkbox" 
                                id="remember-me-checkbox" 
                                name="remember-me-checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="checkbox-item peer hidden"    
                            />
                            <label
                                htmlFor="remember-me-checkbox"
                                className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                            >
                            </label>
                            <span>Remember me</span>
                        </div>
                        <Link href="/" className="text-center text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        { loading ? "Logging in..." : "Log in" }
                    </button>
                </form>
                
                <p className="text-center">Don't have an account? <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
            </div>
        </main>
        </>
    )
}