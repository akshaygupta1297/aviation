import Image from "next/image";
import Logo from "../../../public/assets/images/Logo.png";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen p-4 shadow">
      {/* <h2 className="font-bold text-lg mb-6">Skytix</h2> */}
      <Image src={Logo} alt="Logo" width={150} height={20} />

      <nav className="space-y-3">
        <p className="text-gray-600">Dashboard</p>
        <p className="text-gray-600">Bookings</p>
        <p className="text-gray-600">Schedule</p>
        <p className="text-gray-600">Payments</p>
      </nav>
    </aside>
  );
}