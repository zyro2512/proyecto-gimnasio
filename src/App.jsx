import { useEffect, useState } from 'react';
import './App.css';
import Members from './pages/members'; 
import Routines from './pages/routines';
import Classes from './pages/classes';
import React from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('miembros');

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <header>
        <h1>Gimnasio</h1>
        <h2>Desine Me Vexare</h2>
      </header>
      <nav>
         <a href="#miembros" onClick={() => handleNavClick('miembros')}>Miembros</a>
         <a href="#clases" onClick={() => handleNavClick('clases')}>Clases</a>
         <a href="#rutinas" onClick={() => handleNavClick('rutinas')}>Rutinas de ejercicio</a>
      </nav>
      <main>
        {activeSection === 'miembros' && <Members />}
        {activeSection === 'clases' && <Classes />}
        {activeSection === 'rutinas' && <Routines />}
      </main>
    </>
  );
}



export default App;