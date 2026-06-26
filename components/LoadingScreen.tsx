"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Phase = "enter" | "hold" | "exit" | "done";

const seededRandom = (n: number) => {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
};

const r4 = (v: number) => Math.round(v * 10000) / 10000;

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("enter");
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const done = () => mounted.current && setPhase("done");
    const exit = () => mounted.current && setPhase("exit");
    const hold = () => mounted.current && setPhase("hold");

    const t1 = setTimeout(hold, 2100);
    const t2 = setTimeout(exit, 2400);
    const t3 = setTimeout(done, 3500);
    const safety = setTimeout(done, 5000);

    return () => {
      mounted.current = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(safety);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`loader-root${phase === "exit" ? " loader-exiting" : ""}`}
      aria-hidden="true"
    >
      <div className="loader-particles">
        {Array.from({ length: 28 }).map((_, i) => {
          const px = seededRandom(i * 1.7);
          const py = seededRandom(i * 3.1);
          const pd = 0.4 + seededRandom(i * 5.3) * 1.6;
          const ps = 0.8 + seededRandom(i * 7.9) * 2.4;
          return (
            <div
              key={i}
              className="loader-particle"
              style={
                {
                  "--px": `${r4(px * 100)}%`,
                  "--py": `${r4(py * 100)}%`,
                  "--pd": `${r4(pd)}s`,
                  "--ps": `${r4(ps)}s`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      <div className="loader-streaks" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="loader-streak"
            style={
              {
                "--sa": `${i * 20}deg`,
                "--sd": `${0.05 + (i % 4) * 0.07}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div
        className={`loader-stage${phase === "enter" ? " loader-approaching" : ""}${phase === "exit" ? " loader-rushing-past" : ""}`}
      >
        <div className="loader-halo" />
        <div className="loader-halo loader-halo--ring" />
        <Image
          src="/images/logo.png"
          alt="Villa Fiona"
          width={200}
          height={80}
          className="loader-logo"
          priority
        />
      </div>

      <div className={`loader-bloom${phase === "hold" || phase === "exit" ? " loader-bloom--fire" : ""}`} />
    </div>
  );
}
