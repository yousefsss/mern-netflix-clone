import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useState } from "react";
import { LogOut, Menu, Search } from "lucide-react";
import { useContentStore } from "../store/content";

const NavBar = () => {
  const { logout } = useAuthStore();
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggelMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { setContentType } = useContentStore();

  return (
    <header
      className="max-w-6xl mx-auto flex flex-wrap items-center 
      justify-between p-4 h-20"
    >
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* Desktop NavBar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>

          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>

          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>

        {/* Todo: hadle user.image */}
        <img
          src="/avatar2.png"
          alt="avatar"
          className="h-8 rounded cursor-pointer"
        />

        <LogOut className="size-6 cursor-pointer" onClick={logout} />

        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggelMobileMenu} />
        </div>
      </div>
      {/* Mobile NavBar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={(toggelMobileMenu, () => setContentType("movie"))}
          >
            Movies
          </Link>

          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={(toggelMobileMenu, () => setContentType("tv"))}
          >
            Tv Shows
          </Link>

          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggelMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
