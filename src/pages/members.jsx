import { useState } from 'react';
import MemberList from './MemberList';
import MemberCreate from './MemberCreate';

const Members = () => {
  // Estado para controlar qué componente mostrar (lista o formulario)
  const [showForm, setShowForm] = useState(false);

  // Función para alternar entre mostrar la lista de miembros o el formulario
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Operaciones con miembros del gimnasio</h2>

      {/* Mostrar la lista de miembros si `showForm` es false */}
      {!showForm && (
        <div>
          <MemberList />
          <div className="button-container">
          <button onClick={toggleForm}>Agregar Miembro</button>
          </div>
        </div>
      )}

      {/* Mostrar el formulario si `showForm` es true */}
      {showForm && (
        <div>
          <MemberCreate />
          <div className="button-container">
          <button onClick={toggleForm}>Volver a la Lista</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;