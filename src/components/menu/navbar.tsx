import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex md:hidden fixed top-0 px-4 pt-2 w-screen border-b border-gray-300 bg-white">
      <Image src={"/logo.png"} alt="LogoIG" width={100} height={100} />
    </div>
  );
}
