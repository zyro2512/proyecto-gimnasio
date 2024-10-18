import { useState } from 'react';
import routineService from '../services/routineService'; // Importamos routineService

const RoutineDelete = () => {
  const [error, setError] = useState(null);
  const selectedRoutine = routineService.getSelectedRoutine();

  if (!selectedRoutine) {
    return <div>No hay rutina seleccionada para eliminar.</div>;
  }

  const handleDelete = () => {
    // Preguntar al usuario si realmente quiere eliminar la rutina
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${selectedRoutine.nombre}?`)) {
      // Hacer la solicitud DELETE
      fetch(`http://localhost:3000/api/routines/${selectedRoutine._id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo eliminar la rutina');
          }
          // Limpiar la rutina seleccionada en routineService
          routineService.clearSelectedRoutine();
          // Redirigir a la lista de rutinas usando window.location
          window.location.href = '/routines';
        })
        .catch((err) => {
          console.error('Error eliminando la rutina:', err);
          setError('Hubo un error al eliminar la rutina. Inténtalo nuevamente.');
        });
    }
  };

  return (
    <div>
      <h2>Eliminar rutina</h2>
      {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
      <p>
        Estás a punto de eliminar la rutina: <strong>{selectedRoutine.nombre}</strong>
      </p>
      <button onClick={handleDelete} style={deleteButtonStyle}>Eliminar</button>
      <button onClick={() => window.location.href = '/routines'} style={cancelButtonStyle}>Cancelar</button>
    </div>
  );
};

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

export default RoutineDelete;
