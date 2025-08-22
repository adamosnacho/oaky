"use client";

import Image from "next/image";
import { useRef } from "react";
import { offers } from "./offers";

export default function Home() {
  const allRef = useRef<HTMLDivElement>(null);

  const categories: Record<string, number[]> = {
    "Dla par": [0, 1, 2],
    "Dla biznesu": [3, 4, 5, 6],
    "Najczęściej Wybierane": [30, 31],
    "Dla rodzin z dziećmi": [7, 8, 9],
    "Na specjalne okazje": [10, 11, 12, 13],
    "Polecane pakiety": [14, 15, 16, 17],
    "Na słodko": [18, 19],
    "Atrakcje w okolicy hotelu": [20, 21, 22, 23],
    "Dla kobiet": [24, 25, 26],
    "Inne pakiety": [27, 28, 29],
  };

  const Category = ({ name, ids }: { name: string; ids: number[] }) => {
    return (
      <div className="w-full py-5 max-w-svw">
        <div className="w-full flex justify-center font-bold text-xl mb-4">
          <h3>
            {name} ({ids.length})
          </h3>
        </div>
        <div className="flex gap-4 overflow-x-scroll">
          {ids.map((id) => (
            <div
              key={id}
              className="bg-gray-100 overflow-hidden w-[360px] flex-shrink-0 h-[480px] hover:cursor-pointer"
              onClick={() => (document.location.href = "/offer/" + id)}
            >
              {/* Image container */}
              <div className="relative h-[200px]">
                <Image
                  src={offers[id].img}
                  alt={offers[id].title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:scale-[1.05] transition-all duration-250"
                  unoptimized
                />
              </div>

              <div className="p-6 h-[280px] flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg">{offers[id].title}</h4>
                  <p className="text-sm overflow-y-ellipsis overflow-y-clip h-25">
                    {offers[id].details}
                  </p>
                </div>
                <div className="flex justify-between w-full gap-3">
                  <div>
                    <p className="font-bold text-lg">x zł</p>
                    {/* <p className="font-bold text-lg">{offers[id].price} zł</p> */}
                    <p className="text-[13px] font-light text-gray-600">
                      Cena za szt. w tym podatki i opłaty
                    </p>
                  </div>
                  <button className="bg-gray-500 text-white h-12 p-2 px-4 rounded-full font-bold whitespace-nowrap hover:cursor-pointer">
                    Skorzystaj z ofery
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl p-5">
      <div className="pt-24">
        <div className="w-full h-[45vh] overflow-hidden relative">
          <Image
            src="/pano.png"
            alt="Panorama"
            fill
            style={{ objectFit: "cover" }}
            draggable={false}
            unoptimized
          />
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center py-20 justify-evenly text-white pointer-events-none">
            <h3 className="font-bold text-3xl md:text-6xl pb-10">
              Witaj Jan Kowalski,
            </h3>
            <p>Witamy w Radisson Hotel & Suits, Gdansk</p>
            <button
              className="bg-gray-500 p-4 rounded-full font-bold pointer-events-auto hover:cursor-pointer"
              onClick={() =>
                allRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ulepsz swój pobyt
            </button>
          </div>
        </div>

        <div ref={allRef} id="all">
          {Object.keys(categories).map((categoryName) => (
            <Category
              key={categoryName}
              name={categoryName}
              ids={categories[categoryName]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
