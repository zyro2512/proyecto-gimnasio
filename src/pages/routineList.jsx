import { useState, useEffect } from 'react';

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
    // Estado para controlar qué componente mostrar (lista o detalle)
    const [showDetails, setShowDetails] = useState(false);

    // Función para alternar entre mostrar la lista de miembros o el detalle
    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
    
  useEffect(() => {
    // Fetching routines from the backend
    fetch('http://localhost:3000/api/routines')
      .then(response => response.json())
      .then(data => setRoutines(data))
      .catch(error => console.error('Error fetching routines:', error));
  }, []); // The empty array ensures that this effect only runs once (when the component mounts)

  return (
<div>
  <h3>Lista de Rutinas</h3>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {routines.map(routine => (
        <tr key={routine._id}>
          <td>{routine.nombre}</td>
          <td>{routine.descripcion}</td>
          <td><button onClick={toggleDetails}>Ver</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  );
};

export default RoutineList;
