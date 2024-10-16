import { useState } from 'react';
import classService from '../services/classService'; // Importamos classService

const ClassDelete = () => {
  const [error, setError] = useState(null);
  const selectedClass = classService.getSelectedClass();
  if (!selectedClass) {
    return <div>No hay clase seleccionada para eliminar.</div>;
  }

  const handleDelete = () => {
    // Preguntar al usuario si realmente quiere eliminar la clase
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${selectedClass.nombre}?`)) {
      // Hacer la solicitud DELETE
      fetch(`http://localhost:3000/api/classes/${selectedClass._id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo eliminar la clase');
          }
          // Limpiar la clase seleccionada en classService
          classService.clearSelectedClass();
          // Redirigir a la lista de clases usando window.location
          window.location.href = '/classes';
        })
        .catch((err) => {
          console.error('Error eliminando la clase:', err);
          setError('Hubo un error al eliminar la clase. Inténtalo nuevamente.');
        });
    }
  };

  return (
    <div>
      <h2>Eliminar clase</h2>
      {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
      <p>
        Estás a punto de eliminar la clase: <strong>{selectedClass.nombre}</strong>
      </p>
      <button onClick={handleDelete} style={deleteButtonStyle}>Eliminar</button>
      <button onClick={() => window.location.href = '/classes'} style={cancelButtonStyle}>Cancelar</button>
    </div>
  );
};

// Estilos de ejemplo para los botones
const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  backgroundColor: 'gray',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px',
};


export default ClassDelete;
