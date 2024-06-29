import Image from "next/image";
import SideNav from "@/components/ui/sidenav";
import ReportTable from "@/components/reporttable";

export default function Dashboard() {
    return (
        <main className="h-screen w-full bg-white items-center">  
            <SideNav />
            <div className="items-center justify-center">
        
                <ReportTable />
        
            </div>
        </main>
    );
}