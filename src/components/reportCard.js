'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/User';

export default function ReportCard() {
    const { user, loading, logout } = useUser()
    const [local_loading, setLocalLoading] = useState(loading)
    const [notification, setNotification] = useState({
        status: false,
        message: "",
        type: ""
    })

    useEffect(() => {
        setLocalLoading(loading)
    }, [loading, user, notification])

    const [report, setReport] = useState({
        name: "",
        phone: "",
        address: "",
        fillLevel: ""
    })

    const handleChange = (e) => {
        setReport({
            ...report,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true)
        console.log(report)
        const { name, phone, address, fillLevel } = report
        if (!name || !phone || !address || !fillLevel) {
            setNotification({
                status: true,
                message: "Please fill all the fields",
                type: "Error"
            })
            setLocalLoading(false)
            return
        }
        try{
            const response = await fetch('http://localhost:5000/waste/report-bin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.access_token
                },
                body: JSON.stringify(report)
            })
            const data = await response.json();
            console.log(data)
            if (response.status === 401) {
                logout();
                throw new Error(data.msg);
            }
            if (response.status !== 200) {
                throw new Error(data.msg);
            }
            setNotification({
                status: true,
                message: "Report Submitted Successfully",
                type: "success"
            })
        } catch (error) {
            setNotification({
                status: true,
                message: error.message,
                type: "error"
            })
        } finally {
            setLocalLoading(false)
        }
    }

    return (
        <section className="w-full h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="border-[1px] rounded-lg shadow-sm hover:shadow-lg p-5 max-w-sm w-full text-gray-600 space-y-5">
                <div className="text-center pb-8">
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Report for Collection</h3>
                    </div>
                </div>
                <form
                    className="space-y-5"

                >
                    <div>
                        <input
                            name="name"
                            onChange={handleChange}
                            type="text"
                            placeholder="Name"
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            name="phone"
                            onChange={handleChange}
                            type="number"
                            placeholder="Phone"
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#9ca3af " strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#9ca3af " strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                        </svg>
                        <input
                            name="address"
                            onChange={handleChange}
                            type="text"
                            placeholder="Address"
                            className="w-full py-2 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />
                    </div>

                    <div className="relative mx-auto mt-12">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <select 
                            name="fillLevel"
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
                            <option>Select Dustbin Fill Level</option>
                            <option>50% (Medium)</option>
                            <option>75% (High)</option>
                            <option>100% (Full)</option>
                        </select>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        {local_loading ? "Loading..." : "Submit Report"}
                    </button>
                </form>

                <p className="text-center">Already Repoted? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Check Status</a></p>
            </div>

            {notification.status && (<div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
                <div className="flex justify-between py-3">
                    <div className="flex">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="self-center ml-3">
                            <span className="text-green-600 font-semibold">
                                { notification.type }
                            </span>
                            <p className="text-green-600 mt-1">
                                { notification.message } <br />
                                { notification.type == 'Sucess' ? <b>Report ID: 123456</b> : ""}
                            </p>
                        </div>
                    </div>
                    <button className="self-start text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>)}
        </section>
    )
}