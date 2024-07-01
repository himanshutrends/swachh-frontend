'use client'
import Image from "next/image";
import SideNav from "@/components/ui/sidenav";
import PredictionChart from "@/components/predictionChart";
import Charty from "@/components/multiChart";

export default function Dashboard() {
    return (
        <div className="bg-white flex h-screen">
            <SideNav className="flex-1"/>
            <div className="ml-96 gap-10 flex mt-10">
                <div className="h-56 w-96 border-2 shadow-lg">
                    <PredictionChart />
                </div>
                <div className="h-56 w-96 border-2 shadow-lg">
                <Charty />
                </div>
            </div>
        </div>
    );
}