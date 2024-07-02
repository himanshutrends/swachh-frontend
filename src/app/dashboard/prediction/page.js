'use client'
import Image from "next/image";
import SideNav from "@/components/ui/sidenav";
import PredictionChart from "@/components/predictionChart";
import Charty from "@/components/multiChart";

export default function Dashboard() {
    return (
        <div className="bg-white flex h-screen">
            <SideNav className="flex-1"/>
            <div className="m-28 gap-10 flex justify-center">
                <div className="h-[400px] w-[700px] border-2 rounded-lg shadow-lg p-4">
                    <PredictionChart />
                </div>
                <div className="h-[400px] w-[700px] border-2 rounded-lg shadow-lg p-4">
                <Charty />
                </div>
            </div>
        </div>
    );
}