import Image from "next/image";
import Link from "next/link";
import desktop from "../../../public/airbnb-desktop.png";
import mobile from "../../../public/airbnb-mobile.webp";
import UserNav from "./UserNav";
import { SearchModal } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image src={desktop} alt="logo" className="w-32 hidden lg:block" />

          <Image src={mobile} alt="logo" className="w-12 block lg:hidden" />
        </Link>

        <SearchModal />

        <UserNav />
      </div>
    </nav>
  );
}
