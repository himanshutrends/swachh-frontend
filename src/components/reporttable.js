'use client'
import React, {useEffect, useState, useRef} from 'react'
import { useUser } from '@/context/User'

export default function ReportTable() {
    const { user, setResponseCode } = useUser()
    const [loading, setLoading] = useState(false)
    const [tableItems, setTableItems] = useState([])    

    useEffect(() => {
    (async () => {
        setLoading(true)
        try {
            if (user.access_token) {
                const response = await fetch(`http://localhost:5000/waste/reports`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`
                    }
                })
                setResponseCode(response.status)
                const data = await response.json()
                setTableItems(data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    })()
    }, [])
    
    const updateStatus = async (id, status) => {
        setLoading(true)
        if (user.access_token) {
            const response = await fetch(`http://localhost:5000/waste/reports?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify({ status })
            })
            setResponseCode(response.status)
        }
        setLoading(false)
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-10">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All Reports
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0 text-slate-500">
                    Last 7 Days
                </div>
            </div>
            <div className="mt-12 relative h-max overflow-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Report ID</th>
                            <th className="py-3 pr-6">Date</th>
                            <th className="py-3 pr-6">Current Status</th>
                            <th className="py-3 pr-6">Address</th>
                            <th className="py-3 pr-6">Bin Level</th>
                            <th className="py-3 pr-6">Update Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divNamee-y">
                        {tableItems && tableItems.map((item, Namex) => (
                                <tr key={Namex}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item._id}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.reported_at}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.address}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.fillLevel}</td>
                                    <td className="text-right whitespace-nowrap">
                                        <div className="relative max-w-full mx-auto p-1">
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
                                                onChange={(e) => updateStatus(item._id, e.target.value)}
                                                className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
                                                <option>Pending</option>
                                                <option>Accepted</option>
                                                <option>Collected</option>
                                                <option>Closed</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}