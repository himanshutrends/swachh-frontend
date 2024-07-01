import Image from "next/image";
import SideNav from "@/components/ui/sidenav";
import Map from "@/components/map";

export default function Dashboard() {
    return (
        <div>
            <SideNav />
            <Map />
        </div>
    );
}