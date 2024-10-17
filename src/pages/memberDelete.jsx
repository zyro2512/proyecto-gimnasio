import { useState } from 'react';
import memberService from '../services/memberService'; // Importamos memberService

const MemberDelete = () => {
  const [error, setError] = useState(null);
  const selectedMember = memberService.getSelectedMember();

  if (!selectedMember) {
    return <div>No hay miembro seleccionado para eliminar.</div>;
  }

  const handleDelete = () => {
    // Preguntar al usuario si realmente quiere eliminar al miembro
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${selectedMember.nombre}?`)) {
      // Hacer la solicitud DELETE
      fetch(`http://localhost:3000/api/members/${selectedMember._id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo eliminar al miembro');
          }
          // Limpiar el miembro seleccionado en memberService
          memberService.clearSelectedMember();
          // Redirigir a la lista de miembros usando window.location
          window.location.href = '/members';
        })
        .catch((err) => {
          console.error('Error eliminando al miembro:', err);
          setError('Hubo un error al eliminar al miembro. Inténtalo nuevamente.');
        });
    }
  };

  return (
    <div>
      <h2>Eliminar miembro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
      <p>
        Estás a punto de eliminar al miembro: <strong>{selectedMember.nombre} {selectedMember.apellido}</strong>
      </p>
      <button onClick={handleDelete} style={deleteButtonStyle}>Eliminar</button>
      <button onClick={() => window.location.href = '/members'} style={cancelButtonStyle}>Cancelar</button>
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

export default MemberDelete;
