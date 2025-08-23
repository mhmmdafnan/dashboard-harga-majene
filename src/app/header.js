import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            {/* Logo di kiri */}
            <div className="flex-shrink-0">
              <img src="/images/LOGO-BPS.png" className="w-18" alt="Logo" />
            </div>

            {/* Teks di kanan, ditumpuk kolom */}
            <div className="ml-3 flex flex-col">
              <span className="font-bold text-lg italic">Dashboard Data Harga</span>
              <span className="text-sm italic">BPS KAB MAJENE</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link
              href="/?page=ihk"
              className="text-gray-700 hover:text-blue-600"
            >
              IHK
            </Link>
            <Link
              href="/?page=harga"
              className="text-gray-700 hover:text-blue-600"
            >
              Harga
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
