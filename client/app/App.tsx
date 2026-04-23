"use client";

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import SectionTransition from './components/SectionTransition';


export default function App() {
  return (
    <main>
      <Hero/>
      <SectionTransition 
        line1="We’ve started cooking" 
        line2="While it simmers, here’s my story"
      />
      <About/>
      <SectionTransition 
        line1="Every project is plated with purpose" 
        line2="Take a bite, and explore the flavor of my work"
      />
      <Projects/>
      <Footer/>
    </main>
  );
}