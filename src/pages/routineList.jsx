import { useState, useEffect } from 'react';
import RoutineDetails from './routineDetails';  // Asegúrate de tener este componente
import RoutineDelete from './routineDelete';    // Asegúrate de tener este componente
import routineService from '../services/routineService'; // Importamos routineService

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedToDelRoutine, setSelectedToDelRoutine] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/routines')
      .then(response => response.json())
      .then(data => setRoutines(data))
      .catch(error => console.error('Error fetching routines:', error));
  }, []);

  const handleRoutineClick = (routine) => {
    setSelectedRoutine(routine);
    routineService.setSelectedRoutine(routine);
  };

  const handleDeleteClick = (routine) => {
    setSelectedToDelRoutine(routine);
    routineService.setSelectedRoutine(routine);
  };

  const handleBackToList = () => {
    routineService.setSelectedRoutine(null);
    setSelectedRoutine(null);
  };

  if (selectedRoutine) {
    return <RoutineDetails onBack={handleBackToList} />;
  }

  if (selectedToDelRoutine) {
    return <RoutineDelete />;
  }

  return (
    <div>
      <h3>Lista de Rutinas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Nivel</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {routines.map(routine => (
            <tr key={routine._id}>
              <td>{routine.nombre}</td>
              <td>{routine.descripcion}</td>
              <td>{routine.nivel}</td>
              <td>
                <button onClick={() => handleRoutineClick(routine)}>Ver Detalles</button>
                <button className="botonbaja" onClick={() => handleDeleteClick(routine)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutineList;
