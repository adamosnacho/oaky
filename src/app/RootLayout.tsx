"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import { offers } from "./offers";

export default function rootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const _ = useState();

  if (window !== undefined && window.location.pathname.includes("booking")) return <>{children}</>;
    return (
      <div className="flex flex-col items-center">
        <Navbar />
        {children}
        <div className="w-full mt-20 p-5 bg-gray-500 text-white">
          <p>
            &copy; {new Date().getFullYear()} Zespół Forward Inkubator Starter.
            Wszelkie prawa zastrzeżone.
          </p>
          <p>
            &reg; Radisson - nazwa i logo są zastrzeżonymi znakami towarowymi
            &reg; Radisson.
          </p>

          {/* Expandable footer for image sources */}
          <details className="mt-5">
            <summary className="cursor-pointer font-semibold">
              Źródła zdjęć
            </summary>
            <ul className="mt-2 ml-4 list-disc text-sm">
              {offers.map((offer) => {
                let domain: string;
                try {
                  domain = new URL(offer.img).hostname.replace("www.", "");
                } catch {
                  domain = "unknown";
                }

                return (
                  <li key={offer.title}>
                    {offer.title ?? "Zdjęcie"} -{" "}
                    <a
                      href={offer.img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {domain}
                    </a>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      </div>
    );
};