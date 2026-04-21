"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import ClickSpark from "./animations/clickSpark";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root>
      <ClickSpark
        sparkColor="#e019e0"
        sparkSize={25}
        sparkRadius={20}
        sparkCount={8}
        duration={500}
      >
        <div className="relative min-h-screen bg-black text-white selection:bg-[#EAB308] selection:text-black">
          {children}
        </div>
      </ClickSpark>
    </ReactLenis>
  );
}
