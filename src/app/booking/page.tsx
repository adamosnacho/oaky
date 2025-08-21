"use client";

import { useEffect, useState } from "react";
import BookingClonePL from "./Booking";

export default function Page() {
  const Filip = () => {
    const states: {
      expression: string;
      ony: number;
      x: number;
      y: number;
      xFromLeft: boolean;
      fromCentre?: boolean;
    }[] = [
      { expression: "f1", ony: 0, x: 30, y: 40, xFromLeft: false },
      { expression: "f2", ony: 300, x: -20, y: 70, xFromLeft: false },
      { expression: "f3", ony: 350, x: -20, y: 70, xFromLeft: false },
      { expression: "f1", ony: 351, x: 40, y: 300, xFromLeft: false },
      { expression: "f2", ony: 800, x: 40, y: 300, xFromLeft: false },
      { expression: "f1", ony: 880, x: 40, y: 300, xFromLeft: true },
      { expression: "f3", ony: 1000, x: 40, y: 300, xFromLeft: true },
      { expression: "f2", ony: 1200, x: -100, y: 300, xFromLeft: true },
    ];

    const [scrollY, setScrollY] = useState(0);
    const [windowWidth, setWindowWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    let current = states[0];
    let next = states[states.length - 1];
    for (let i = 0; i < states.length - 1; i++) {
      if (scrollY >= states[i].ony && scrollY <= states[i + 1].ony) {
        current = states[i];
        next = states[i + 1];
        break;
      }
    }

    const t = (scrollY - current.ony) / Math.max(1, next.ony - current.ony);
    const imageWidth = 100;

    const toAbsoluteX = (state: (typeof states)[0]) => {
      if (state.fromCentre) {
        const centre = windowWidth / 2 - imageWidth / 2;
        return state.xFromLeft ? centre - state.x : centre + state.x;
      } else {
        return state.xFromLeft ? state.x : windowWidth - state.x - imageWidth;
      }
    };

    const absCurrentX = toAbsoluteX(current);
    const absNextX = toAbsoluteX(next);

    const x = absCurrentX + (absNextX - absCurrentX) * t;
    const y = scrollY < next.ony ? current.y : next.y;

    const expression =
      t < 0.5 ? `/${current.expression}.png` : `/${next.expression}.png`;

    return (
      <div>
        <img
          src={expression}
          width={imageWidth}
          className="absolute z-50 transition-transform duration-500 ease-in-out transform-gpu"
          style={{
            transform: `translate(${x}px, ${y + scrollY}px)`,
          }}
        />
        <p
          className="absolute z-50 text-gray-700 font-bold transition-transform duration-500 ease-in-out"
          style={{
            transform: `translate(${x}px, ${y + scrollY}px)`,
          }}
        >
          {Math.round(scrollY)}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-cyan-600 w-full h-20 flex items-center justify-between px-20">
        <p className="text-white text-2xl font-bold">Zespół Forward</p>
        <img
          src="/forward.png"
          className="invert"
          width={80}
          alt="Forward Logo"
        />
      </div>

      <div className="p-5 overflow-x-clip max-w-dvw relative">
        <Filip />

        <p className="font-bold text-2xl pt-20 pb-15 mx-5">
          Cześć! Nazywam się <strong className="text-cyan-600">Felippe</strong>
        </p>

        <p className="font-bold text-2xl py-15 px-5 bg-gray-100 rounded-lg shadow-sm">
          Współpracuję z{" "}
          <strong className="text-cyan-600">zespołem Forward</strong>
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center py-15 px-5 gap-5">
          <img
            src="/rlogo.png"
            alt="Logo Radisson"
            className="w-[30%] object-contain"
          />
          <p className="font-bold text-lg">
            Naszym celem jest pomóc{" "}
            <strong className="text-cyan-600">Radisson</strong> przyciągnąć
            więcej klientów i zachęcić ich do wykupienia dodatkowych pakietów.
          </p>
        </div>

        <div className="py-15 px-5 max-w-[50vw] mx-5 bg-gray-100 rounded-lg shadow-sm">
          <p className="font-bold text-lg">Nasza obecna sytuacja</p>
          <p className="pt-3">
            - Jesteśmy <strong className="text-cyan-600">ograniczeni</strong>{" "}
            przez sieć Radisson, ponieważ nie możemy modyfikować{" "}
            <strong className="text-cyan-600">
              strony internetowej, Instagrama ani innych platform online.
            </strong>
          </p>
          <p className="pt-1">
            - Musimy znaleźć{" "}
            <strong className="text-cyan-600">kreatywne pomysły</strong> na nowe
            pakiety, które zwiększą zainteresowanie dodatkowymi usługami.
          </p>
        </div>

        <div className="flex justify-end">
          <p className="font-bold text-lg py-15 px-5 max-w-[60vw] text-end">
            Przygotowaliśmy przykładowe doświadczenie, aby pokazać, jak <br />
            <strong className="text-cyan-600">gość widzi te oferty.</strong>
          </p>
        </div>

        <p className="font-bold text-3xl py-15 px-5 text-center">
          Spróbuj zrobić <strong className="text-cyan-600">fikcyjną</strong>{" "}
          rezerwację
        </p>
      </div>

      <BookingClonePL />
    </div>
  );
}
