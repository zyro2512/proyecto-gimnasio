import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MemberList from './components/MemberList'; 
import React from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('membresias');
  const [members, setMembers] = useState([]); // Estado para almacenar los datos de la API

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/members', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => setMembers(data)) // Almacenar los datos en el estado
    .catch(error => console.error('Error:', error));
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  return (
    <>
      <header>
        <h1>Gimnasio</h1>
        <h2>Desine Me Vexare</h2>
      </header>
      <nav>
         <a href="#membresias" onClick={() => handleNavClick('membresias')}>Membresías</a>
         <a href="#reservas" onClick={() => handleNavClick('reservas')}>Clases</a>
         <a href="#rutinas" onClick={() => handleNavClick('rutinas')}>Rutinas de ejercicio</a>
      </nav>
      <main>
        <MemberList />
        {/* {activeSection === 'membresias' && <Membresias members={members} />}
        {activeSection === 'reservas' && <Reservas />}
        {activeSection === 'rutinas' && <Rutinas />}
        */}
      </main>
    </>
  );
}

const Membresias = ({ members }) => (
  <div>
    <h2>Membresías</h2>
    <p>Información sobre las membresías.</p>
    <ul>
      {members.map(member => (
        <li key={member._id}>
          {member.nombre} {member.apellido} - {member.membresia.tipo} ({new Date(member.membresia.fecha_inicio).toLocaleDateString()} - {new Date(member.membresia.fecha_fin).toLocaleDateString()})
        </li>
      ))}
    </ul>
    <form>
      <label>
        Nombre:
        <br />
        <input type="text" name="nombre" />
      </label>
      <br />
      <label>
        Apellido:
        <br />
        <input type="text" name="apellido" />
      </label>
      <br />
      <label>
        Fecha de Nacimiento:
        <br />
        <input type="date" name="fechaNacimiento" />
      </label>
      <br />
      <label>
        Altura:
        <br />
        <input type="number" name="altura" />
      </label>
      <br />
      <label>
        Peso:   
       <br />
        <input type="number" name="peso" />
      </label>
      <br />
      <label>
        Email:
        <br />
        <input type="email" name="email" />
      </label>
      <br />
      <label>
        Tipo de Membresía:
        <br />
        <select name="tipoMembresia">
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
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