import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 mt-4 mb-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/favicon.ico"
          alt="logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="text-xl font-semibold">Crime Alert</span>
      </div>

      <div>
        <Link href="/">Home</Link>
      </div>

      {/* Slogan */}
      <div className="text-sm text-gray-300">
        <span>easily report crime to the authorities</span>
      </div>
    </nav>
  );
};

export default Navbar;
