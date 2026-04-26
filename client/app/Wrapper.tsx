"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import ClickSpark from "./animations/clickSpark";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root>
      <ClickSpark
        sparkColor="#980606ff"
        sparkSize={25}
        sparkRadius={20}
        sparkCount={8}
        duration={500}
      >
        <div 
          className="relative min-h-screen selection:bg-[#EAB308] selection:text-black"
          style={{ backgroundColor: "#F5F0E8", color: "#420303" }}
        >
          {children}
        </div>
      </ClickSpark>
    </ReactLenis>
  );
}
