import Image from "next/image";
import SideNav from "@/components/ui/sidenav";
import PredictionChart from "@/components/predictionChart";

export default function Dashboard() {
    return (
        <div>
            {/* <SideNav /> */}
            <PredictionChart />
        </div>
    );
}