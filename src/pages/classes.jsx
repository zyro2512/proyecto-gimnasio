import { useState } from 'react';
import ClassList from './ClassList';
import ClassCreate from './ClassCreate';

const Classes = () => {
  // Estado para controlar qué componente mostrar (lista o formulario)
  const [showForm, setShowForm] = useState(false);

  // Función para alternar entre mostrar la lista de clases o el formulario
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Operaciones con clases del gimnasio</h2>

      {/* Mostrar la lista de clases si `showForm` es false */}
      {!showForm && (
        <div>
          <ClassList />
          <button onClick={toggleForm}>Agregar Clase</button>
        </div>
      )}

      {/* Mostrar el formulario si `showForm` es true */}
      {showForm && (
        <div>
          <ClassCreate />
          <button onClick={toggleForm}>Volver a la Lista</button>
        </div>
      )}
    </div>
  );
};

export default Classes;