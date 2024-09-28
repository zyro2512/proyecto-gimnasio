import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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
         <a href="#reservas" onClick={() => handleNavClick('reservas')}>Reservas de clases</a>
         <a href="#rutinas" onClick={() => handleNavClick('rutinas')}>Rutinas de ejercicio</a>
      </nav>
      <main>
        {activeSection === 'membresias' && <Membresias />}
        {activeSection === 'reservas' && <Reservas />}
        {activeSection === 'rutinas' && <Rutinas />}
      </main>
    </>
  );
}

const Membresias = () => (
  <div>
    <h2>Membresías</h2>
    <p>Información sobre las membresías.</p>
  </div>
);

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
