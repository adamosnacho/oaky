"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize

    // Check if current path is "/"
    setIsRoot(window.location.pathname === "/");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goBack = () => {
    const pathParts = window.location.pathname.split("/").slice(0, -2);
    window.location.href = pathParts.join("/") || "/";
  };

  return (
    <div>
      {!isRoot && (
        <div
          onClick={goBack}
          className="flex justify-center items-center bg-gray-100 w-10 h-10 fixed left-0 top-0 hover:cursor-pointer z-50"
        >
          <ChevronLeft />
        </div>
      )}
      <div
        className={`flex h-32 w-screen fixed left-0 top-0 items-center justify-center z-10 transition-transform duration-500 ${
          scrolled ? "-translate-y-30" : "translate-y-0"
        }`}
      >
        <Image
          src="/logo.png"
          alt="Radisson Logo"
          width={128}
          height={128}
          draggable={false}
        />
      </div>
    </div>
  );
}
