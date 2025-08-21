"use client";

import { offers } from "@/app/offers";
import { Check, Square } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Offer() {
  const params = useParams();
  const id = parseInt(params.slug as string); // if your route is /[slug]

  return (
    <div className="max-w-5xl px-5">
      <div className="pt-24">
        <div className="w-full h-[30vh] overflow-hidden relative">
          <Image
            src="/pano.png"
            alt="Panorama"
            fill
            style={{ objectFit: "cover" }}
            draggable={false}
            unoptimized
          />
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none flex flex-col items-center py-10 justify-evenly text-white">
            <h3 className="font-bold text-4xl md:text-6xl text-center">
              {offers[id].title}
            </h3>
          </div>
        </div>
        <div className="flex w-full sm:flex-row flex-col">
          <div className="flex-4/5 pt-10">
            <p className="text-sm pb-10">
              <span
                onClick={() => (document.location.href = "/")}
                className="text-yellow-400 underline hover:cursor-pointer"
              >
                Strona Główna
              </span>{" "}
              {">"} {offers[id].title}
            </p>

            <h1 className="font-bold text-3xl">Więcej Informacji</h1>

            <p className="pey-5 text-gray-800 leading-relaxed">
              {offers[id].details}
            </p>

            <img src={offers[id].img} alt="" className="w-full" />
          </div>
          <div className="sm:flex-4/9 border-gray-300 border-1 sm:ml-10 pb-10">
            <div>
              <div className="p-10 py-7">
                <p className="font-bold text-[30px]">x zł</p>
                {/* <p className="font-bold text-[30px]">{offers[id].price} zł</p> */}
                <p className="text-[13px] font-light text-gray-600">
                  Cena za szt. w tym podatki i opłaty
                </p>
              </div>

              <div className="px-10">
                <button className="bg-gray-500 text-white w-full py-3 rounded-full font-bold hover:cursor-pointer">
                  Skorzystaj z ofery
                </button>
              </div>
            </div>
            <div className="w-full border-t-1 mt-10 pt-10 border-gray-300 flex items-center flex-col">
              <h3 className="font-extrabold text-xl px-2 text-center">
                Bezpieczeństwo i elastyczność
              </h3>
              <div className="w-full px-5">
                <p className="flex gap-2">
                  <Check size={25} color="green" />
                  Ponad 100 ofert każdego dnia
                </p>
                <p className="flex gap-2">
                  <Check
                    size={25}
                    color="green"
                    className="min-w-[25px] min-h-[25px]"
                  />
                  Szybka i prosta płatność (opłata dodawana bezpośrednio do
                  rachunku)
                </p>
              </div>
              <h3 className="font-extrabold text-xl px-2 text-center mt-5">
                Jak To Działa?
              </h3>
              <div className="w-full px-5">
                <p className="flex gap-2">
                  <Square
                    size={20}
                    color="green"
                    className="min-w-[20px] min-h-[20px] mt-[2px]"
                  />
                  Wybierasz i rezerwujesz ofertę lub atrakcję
                </p>
                <p className="flex gap-2">
                  <Square
                    size={20}
                    color="green"
                    className="min-w-[20px] min-h-[20px] mt-[2px]"
                  />
                  Nasz zespół wysyła Ci e-mail z potwierdeniem
                </p>
                <p className="flex gap-2">
                  <Square
                    size={20}
                    color="green"
                    className="min-w-[20px] min-h-[20px] mt-[2px]"
                  />
                  Opłata zostaje dodana do Twojego rachunku
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
