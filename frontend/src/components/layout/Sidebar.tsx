"use client"
import Image from "next/image";
import Logo from "../../assets/images/Logo.svg";
import Dashboard from "../../assets/images/SideDashboard.svg";
import Bookings from "../../assets/images/SideBook.svg";
import Schedule from "../../assets/images/SideCalander.svg";
import Payments from "../../assets/images/SidePayment.svg";
import Messages from "../../assets/images/SideMessage.svg";
import Flight from "../../assets/images/SidePlan.svg";
import Deals from "../../assets/images/SideDeal.svg";
import { usePathname, useRouter } from "next/navigation";
import { GOLD } from "@/utils/colors";

export default function Sidebar() {
  const pathName = usePathname()
  console.log(pathName);

  return (
    <aside className="w-64 bg-white p-4 shadow sticky top-0">

      <div className="flex flex-col items-center">
        <Image src={Logo} alt="Logo" width={150} />

        <nav className="mt-12">
          <div className={`flex gap-1 w-40 rounded pl-2 py-4 ${pathName === "/dashboard" && "bg-[#E4C779]"}`}>
            <Image src={Dashboard} alt="Dashboard" />
            <p className="text-gray-600">Dashboard</p>
          </div>
          <div className={`flex gap-1 w-40 rounded pl-2 py-4 ${pathName === "/dashboard" && "bg-[#E4C779]"}`}>
            <Image src={Bookings} alt="Dashboard" />
            <p className="text-gray-600">Bookings</p>
          </div>
          <div className={`flex gap-1 w-40 rounded pl-2 py-4 ${pathName === "/dashboard" && "bg-[#E4C779]"}`}>
            <Image src={Schedule} alt="Dashboard" />
            <p className="text-gray-600">Schedule</p>
          </div>
          <div className={`flex gap-1 w-40 rounded pl-2 py-4 ${pathName === "/dashboard" && "bg-[#E4C779]"}`}>
            <Image src={Payments} alt="Dashboard" />
            <p className="text-gray-600">Payments</p>
          </div>
          <div className={`flex gap-1 w-40 rounded pl-2 py-4 ${pathName === "/dashboard" && "bg-[#E4C779]"}`}>
            <Image src={Messages} alt="Dashboard" />
            <p className="text-gray-600">Messages</p>
          </div>
          <div className={`flex gap-1 w-40 rounded pl-2 py-4 ${pathName === "/dashboard" && "bg-[#E4C779]"}`}>
            <Image src={Flight} alt="Dashboard" />
            <p className="text-gray-600">Flight Tracking</p>
          </div>
          <div className={`flex gap-1 w-40 rounded pl-2 py-4 ${pathName === "/dashboard" && "bg-[#E4C779]"}`}>
            <Image src={Deals} alt="Dashboard" />
            <p className="text-gray-600">Deals</p>
          </div>
        </nav>
      </div>
    </aside>
  );
}