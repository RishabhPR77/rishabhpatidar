import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import { Achievements, Contact } from './components/Achievements';

function Divider() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)',
      margin: '0 2rem',
    }} />
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Divider />
      <Skills />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      <Achievements />
      <Divider />
      <Contact />
    </>
  );
}
