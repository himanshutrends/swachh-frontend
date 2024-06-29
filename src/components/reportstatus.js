'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/User';

export default function ReportStatus() {
    const [steps, setStep] = useState({
        stepsItems: ["Submitted", "Predicted Date", "Collected", "Closed"],
        currentStep: 2
    })

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
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Check Complaint Status</h3>
                    </div>
                </div>
                <form
                    className="space-y-5"

                >
                    <div>
                        <input
                            name="reportid"
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Report ID"
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        {local_loading ? "Searching..." : "Check Status"}
                    </button>
                </form>
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


            <div className="max-w-2xl w-full mx-auto px-4 md:px-0 mt-10">
            <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
                {steps.stepsItems.map((item, idx) => (
                    <li aria-current={steps.currentStep == idx + 1 ? "step" : false} className="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0">
                        <div className="flex flex-col items-center md:flex-row md:flex-1">
                            <hr className={`w-full border hidden md:block ${idx == 0 ? "border-none" : "" || steps.currentStep >= idx + 1 ? "border-indigo-600" : ""}`} />
                            <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? "bg-indigo-600 border-indigo-600" : "" || steps.currentStep == idx + 1 ? "border-indigo-600" : ""}`}>
                                <span className={`w-2.5 h-2.5 animate-ping rounded-full bg-indigo-600 ${steps.currentStep != idx + 1 ? "hidden" : ""}`}></span>
                                {
                                    steps.currentStep > idx + 1 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    ) : ""
                                }
                            </div>
                            <hr className={`h-12 border md:w-full md:h-auto ${idx + 1 == steps.stepsItems.length ? "border-none" : "" || steps.currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                        </div>
                        <div className="h-8 flex justify-center items-center md:mt-3 md:h-auto">
                            <h3 className={`text-sm ${steps.currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                {item}
                            </h3>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <p className="text-gray-600 text-sm text-center"><b>Report ID: </b>123456</p>
                <p className="text-gray-600 text-sm text-center"><b>Submitted Date: </b>12/12/2021</p>
                <p className="text-gray-600 text-sm text-center"><b>Predicted Date: </b>12/12/2021</p>
            </div>
        </div>
        </section>
    )
}