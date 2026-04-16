import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50 saturate-75"
      >
        <source src="/portfolio-hero.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 text-white/95">
            Transforming Ideas into Digital Reality
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed">
            Improving through iteration. I enjoy turning ideas into real, usable experiences — focusing on clarity, simplicity, and what actually works. With each project, I learn, adapt, and refine, growing not just in code, but in how I think and solve problems.
          </p>
          <div className="mt-12">
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-lg text-white/85 hover:gap-4 transition-all duration-300"
            >
              See how I work
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

// import { ArrowRight } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function Hero() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-gray-950">

//       {/* Geometric shapes */}
//       <div className="absolute inset-0 pointer-events-none">

//         {/* Large circle — top right */}
//         <div
//           className="absolute rounded-full border border-white/20"
//           style={{
//             width: 600,
//             height: 600,
//             top: -150,
//             right: -100,
//             animation: 'slowSpin 40s linear infinite',
//           }}
//         />
//         {/* Inner ring */}
//         <div
//           className="absolute rounded-full border border-white/10"
//           style={{
//             width: 420,
//             height: 420,
//             top: -60,
//             right: -10,
//             animation: 'slowSpin 28s linear infinite reverse',
//           }}
//         />

//         {/* Diagonal line grid — bottom left */}
//         <svg
//           className="absolute bottom-0 left-0 opacity-20"
//           width="400"
//           height="400"
//           viewBox="0 0 400 400"
//         >
//           {Array.from({ length: 10 }).map((_, i) => (
//             <line
//               key={i}
//               x1={i * 44 - 40}
//               y1="400"
//               x2={i * 44 + 160}
//               y2="0"
//               stroke="white"
//               strokeWidth="0.8"
//             />
//           ))}
//         </svg>

//         {/* Floating square — mid left */}
//         <div
//           className="absolute border border-white/20"
//           style={{
//             width: 180,
//             height: 180,
//             left: '8%',
//             top: '35%',
//             animation: 'floatA 12s ease-in-out infinite',
//             transform: 'rotate(20deg)',
//           }}
//         />

//         {/* Small dot grid — top left */}
//         <svg
//           className="absolute top-16 left-16 opacity-25"
//           width="160"
//           height="160"
//           viewBox="0 0 160 160"
//         >
//           {Array.from({ length: 5 }).map((_, row) =>
//             Array.from({ length: 5 }).map((_, col) => (
//               <circle
//                 key={`${row}-${col}`}
//                 cx={col * 32 + 8}
//                 cy={row * 32 + 8}
//                 r="1.5"
//                 fill="white"
//               />
//             ))
//           )}
//         </svg>

//         {/* Thin horizontal line — center */}
//         <div
//           className="absolute left-0 right-0 border-t border-white/10"
//           style={{ top: '52%' }}
//         />

//         {/* Small circle — bottom right */}
//         <div
//           className="absolute rounded-full border border-white/20"
//           style={{
//             width: 90,
//             height: 90,
//             bottom: '18%',
//             right: '12%',
//             animation: 'floatB 9s ease-in-out infinite',
//           }}
//         />

//         {/* Triangle — right center */}
//         <svg
//           className="absolute opacity-20"
//           style={{ right: '18%', top: '30%', animation: 'floatB 15s ease-in-out infinite' }}
//           width="120"
//           height="104"
//           viewBox="0 0 120 104"
//         >
//           <polygon points="60,0 120,104 0,104" fill="none" stroke="white" strokeWidth="0.8" />
//         </svg>

//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-5xl w-full">
//         <div
//           className={`transition-all duration-1000 ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 text-white/95">
//             Transforming Ideas into Digital Reality
//           </h1>
//           <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed">
//             Improving through iteration. I enjoy turning ideas into real, usable experiences — focusing on clarity, simplicity, and what actually works. With each project, I learn, adapt, and refine, growing not just in code, but in how I think and solve problems.
//           </p>
//           <div className="mt-12">
//             <a
//               href="#work"
//               className="inline-flex items-center gap-2 text-lg text-white/80 hover:gap-4 transition-all duration-300"
//             >
//               See how I work
//               <ArrowRight className="w-5 h-5" />
//             </a>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slowSpin {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(360deg); }
//         }
//         @keyframes floatA {
//           0%, 100% { transform: rotate(20deg) translateY(0px); }
//           50%       { transform: rotate(20deg) translateY(-18px); }
//         }
//         @keyframes floatB {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-12px); }
//         }
//       `}</style>

//     </section>
//   );
// }