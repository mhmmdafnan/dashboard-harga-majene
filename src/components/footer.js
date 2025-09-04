"use client";

export default function Footer() {
  return (
    <footer className="bg-white max-w-7xl px-6 py-2 mx-auto text-gray-200 mt-10 rounded-2xl">
      <div className=" ">
        <div className="text-center text-xs text-gray-500">
          {/* Brand */}
          <div className="mb-2 ">
            <div className="flex items-center justify-center gap-2 mb-1">
              <img src="/favicon.png" className="w-10" alt="Logo" />
              <h2 className="text-lg font-semibold text-gray-900 italic">
                Dashboard Data Harga
              </h2>
            </div>
            <p className="text-sm text-gray-400 ">
              © {new Date().getFullYear()} Muhammad Afnan Falieh. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
