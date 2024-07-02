import Image from "next/image";
import SideNav from "@/components/ui/sidenav";
import Map from "@/components/map";

export default function Dashboard() {
    return (
        <div className="flex h-screen w-screen bg-white">
            <SideNav />
            <div className="h-3/4 w-3/4 m-32 flex-col flex text-black border rounded shadow-sm items-center">
            <Map />
            </div>
        </div>
    );
}