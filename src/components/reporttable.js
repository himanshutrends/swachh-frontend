export default function ReportTable() {

    const tableItems = [
        {
            id: "L0912393",
            date: "Oct 9, 2023",
            status: "Active",
            level: "35.000",
            address: "Sherpura"
        },
        {
            id: "H934935",
            date: "Oct 12, 2023",
            status: "Active",
            level: "12.000",
            address: "Sherpura"
        },
        {
            id: "M83748374",
            date: "Oct 22, 2023",
            status: "Collected",
            level: "20.000",
            address: "Durga Nagar"
        },
        {
            id: "L673647637",
            date: "Jan 5, 2023",
            status: "Active",
            level: "5.000",
            address: "Sherpura"
        },
        {
            id: "M2424255",
            date: "Jan 6, 2023",
            status: "Active",
            level: "90.000",
            address: "Durga Nagar"
        },
    ]


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
                        {
                            tableItems.map((item, Namex) => (
                                <tr key={Namex}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.id}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.address}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.level}</td>
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
                                            <select className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
                                                <option>Active</option>
                                                <option>Accepted</option>
                                                <option>Collected</option>
                                                <option>Close</option>
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