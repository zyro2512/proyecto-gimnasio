import { useState, useEffect } from 'react';
import RoutineList from './routineList';
import RoutineCreate from './routineCreate';

const Routines = () => {
  // Estado para controlar qué componente mostrar (lista o formulario)
  const [showForm, setShowForm] = useState(false);

  // Función para alternar entre mostrar la lista de rutinas o el formulario
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Operaciones con rutinas y ejercicios del gimnasio</h2>

      {/* Mostrar la lista de rutinas si `showForm` es false */}
      {!showForm && (
        <div>
          <RoutineList />
          <button onClick={toggleForm}>Agregar Rutina</button>
        </div>
      )}

      {/* Mostrar el formulario si `showForm` es true */}
      {showForm && (
        <div>
          <RoutineCreate />
          <button onClick={toggleForm}>Volver a la Lista</button>
        </div>
      )}
    </div>
  );
};

export default Routines;
