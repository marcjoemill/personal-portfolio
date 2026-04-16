"use client";

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import SelectedWork from './components/SelectedWork';
import Proof from './components/Proof';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Philosophy />
      <SelectedWork />
      <div id="proof">
        <Proof />
      </div>
      <div id="about">
        <About />
      </div>
      <Footer />
    </div>
  );
}

export default App;
