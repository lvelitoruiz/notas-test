import { useUser } from "@/contexts/UserContext";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute left-0 top-0 z-20 flex justify-between w-full py-4 px-[20px] md:px-8 lg:px-12 items-center">
      <h2 className="uppercase font-bold text-3xl text-white md:text-gray-600">
        Notes
      </h2>
      {user && (
        <>
          <div className="gap-8 items-center font-sans hidden md:flex">
            <Link
              className="text-gray-300 uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-gray-300 uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
              href="/create"
            >
              Create Note
            </Link>
            <Link
              className="text-gray-300 uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
              href="/archived"
            >
              Archived
            </Link>
            <Link
              className="text-gray-300 uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
              href="/profile"
            >
              Profile
            </Link>
            <button
              className="text-gray-300 uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div className="flex md:hidden">
            {!isMenuOpen ? (
              <FontAwesomeIcon
                onClick={toggleMenu}
                className="text-white w-6 h-6"
                icon={faBars}
              />
            ) : (
              <FontAwesomeIcon
                onClick={toggleMenu}
                className="text-white w-6 h-6"
                icon={faXmark}
              />
            )}
          </div>
          <div
            className={`block md:hidden fixed left-0 top-0 h-screen overflow-auto w-[250px] transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute left-0 top-0 w-full h-full bg-gray-800 flex flex-col px-4 py-20 gap-4">
              <Link
                className="text-white uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
                href="/"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                className="text-white uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
                href="/create"
                onClick={toggleMenu}
              >
                Create Note
              </Link>
              <Link
                className="text-white uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
                href="/archived"
                onClick={toggleMenu}
              >
                Archived
              </Link>
              <Link
                className="text-white uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
                href="/profile"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <button
                className="text-white text-left uppercase text-xs font-light transition-all border-b border-b-gray-700 pb-1 duration-150 hover:text-white hover:border-b hover:border-b-gray-200"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
