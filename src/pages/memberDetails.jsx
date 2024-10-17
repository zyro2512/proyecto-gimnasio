import { useState, useEffect } from 'react';
import memberService from '../services/memberService';

const MemberDetails = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);  // Estado para saber si estamos editando
  const [editableMember, setEditableMember] = useState(null);  // Estado para manejar el miembro editable

  useEffect(() => {
    const selectedMember = memberService.getSelectedMember();  // Obtenemos el miembro seleccionado del servicio
    if (selectedMember) {
      setEditableMember({ ...selectedMember });  // Creamos una copia para editar
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableMember({
      ...editableMember,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    // Guardar los cambios en el backend
    fetch(`http://localhost:3000/api/members/${editableMember._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableMember),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos actualizados:', data);
        setIsEditing(false); // Salir del modo edición
        memberService.setSelectedMember(editableMember); // Actualizar el miembro en el servicio también
      })
      .catch(error => console.error('Error updating member:', error));
  };

  if (!editableMember) {
    return <div>Cargando detalles del miembro...</div>;
  }

  return (
    <div>
      <h2>Detalles del Miembro</h2>

      <div>
        <label>Nombre:</label>
        {isEditing ? (
          <input
            type="text"
            name="nombre"
            value={editableMember.nombre}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editableMember.nombre}</p>
        )}
      </div>

      <div>
        <label>Apellido:</label>
        {isEditing ? (
          <input
            type="text"
            name="apellido"
            value={editableMember.apellido}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editableMember.apellido}</p>
        )}
      </div>

      <div>
        <label>Peso:</label>
        {isEditing ? (
          <input
            type="number"
            name="peso"
            value={editableMember.peso}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editableMember.peso} kg</p>
        )}
      </div>

      <div>
        <label>Altura:</label>
        {isEditing ? (
          <input
            type="number"
            name="altura"
            value={editableMember.altura}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editableMember.altura} m</p>
        )}
      </div>

      <div>
        <label>Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editableMember.email}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editableMember.email}</p>
        )}
      </div>

      <div>
        <label>Membresía:</label>
        {isEditing ? (
          <select
            name="membresia.tipo"
            value={editableMember.membresia.tipo}
            onChange={handleInputChange}
          >
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        ) : (
          <p>{editableMember.membresia.tipo}</p>
        )}
      </div>

      {isEditing ? (
        <button onClick={handleSaveClick}>Guardar Cambios</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Modificar</button>
      )}

      <button onClick={onBack}>Volver a la lista</button>
    </div>
  );
};

export default MemberDetails;
