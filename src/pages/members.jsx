import { useState } from 'react';
import MemberList from '../components/MemberList';
import MemberCreate from '../components/MemberCreate';

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
          <button onClick={toggleForm}>Agregar Miembro</button>
        </div>
      )}

      {/* Mostrar el formulario si `showForm` es true */}
      {showForm && (
        <div>
          <MemberCreate />
          <button onClick={toggleForm}>Volver a la Lista</button>
        </div>
      )}
    </div>
  );
};

export default Members;