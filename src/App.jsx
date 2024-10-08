import { useEffect, useState } from 'react';
import './App.css';
import Members from './components/members'; 
import React from 'react';
import MemberList from './components/memberList';

function App() {
  const [activeSection, setActiveSection] = useState('membresias');

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
         <a href="#membresias" onClick={() => handleNavClick('membresias')}>Membresías</a>
         <a href="#miembros" onClick={() => handleNavClick('miembros')}>Miembros</a>
         <a href="#reservas" onClick={() => handleNavClick('reservas')}>Clases</a>
         <a href="#rutinas" onClick={() => handleNavClick('rutinas')}>Rutinas de ejercicio</a>
      </nav>
      <main>
        {activeSection === 'membresias' && <Members />}
        {activeSection === 'miembros' && <MemberList />}
        {activeSection === 'reservas' && <Reservas />}
        {activeSection === 'rutinas' && <Rutinas />}
      </main>
    </>
  );
}


const Reservas = () => (
  <div>
    <h2>Reservas de clases</h2>
    <p>Información sobre las reservas de clases.</p>
  </div>
);

const Rutinas = () => (
  <div>
    <h2>Rutinas de ejercicio</h2>
    <p>Información sobre las rutinas de ejercicio.</p>
  </div>
);

export default App;