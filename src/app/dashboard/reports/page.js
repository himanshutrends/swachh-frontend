'use client'
import SideNav from "@/components/ui/sidenav";
import ReportTable from "@/components/reporttable";
import isAuthenticated from "@/components/isAuthenticated";

const Dashboard = () => {
    return (
        <main className="h-screen w-full bg-white items-center">  
            <SideNav />
            <div className="items-center justify-center">
                <ReportTable />
            </div>
        </main>
    );
}

export default isAuthenticated(Dashboard);