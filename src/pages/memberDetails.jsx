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
  
    if (name.includes('membresia.')) {
      const field = name.split('.')[1];  // Obtiene la segunda parte (ej. 'tipo', 'estado', 'fecha_inicio', 'fecha_fin')
  
      setEditableMember((prevState) => {
        // Si el estado cambia a "inactivo", establecer la fecha de fin a la fecha actual
        if (field === 'estado' && value === 'inactivo') {
          const currentDate = new Date().toISOString().split('T')[0];  // Obtener la fecha actual en formato YYYY-MM-DD
          return {
            ...prevState,
            membresia: {
              ...prevState.membresia,
              estado: value,
              fecha_fin: currentDate,  // Actualizar fecha de fin a la fecha actual
            },
          };
        }
  
        // Para los demás campos de membresía
        return {
          ...prevState,
          membresia: {
            ...prevState.membresia,
            [field]: value,
          },
        };
      });
    } else {
      // Actualización para los campos que no son anidados
      setEditableMember({
        ...editableMember,
        [name]: value,
      });
    }
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
      <div className="container">
      {/* Datos personales y membresía */}
        <div className="left-column">
        <h3>Información personal</h3>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={editableMember.nombre}
            onChange={handleInputChange}
            disabled={!isEditing}  // Deshabilitado si no está en modo edición
          />
        </div>
        <div>
          <label>Apellido: </label>
          <input
            type="text"
            name="apellido"
            value={editableMember.apellido}
            onChange={handleInputChange}
            disabled={!isEditing}  // Deshabilitado si no está en modo edición
          />
        </div>
        <div>
          <label>Peso: </label>
          <input
            type="number"
            name="peso"
           value={editableMember.peso}
           onChange={handleInputChange}
           disabled={!isEditing}  // Deshabilitado si no está en modo edición
         />
        </div>
        <div>
          <label>Altura: </label>
          <input
            type="number"
            name="altura"
            value={editableMember.altura}
            onChange={handleInputChange}
           disabled={!isEditing}  // Deshabilitado si no está en modo edición
          />
        </div>
        <div>
          <label>Fecha de nacimiento: </label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={editableMember.fecha_nacimiento ? editableMember.fecha_nacimiento.split('T')[0] : ''}
            onChange={handleInputChange}
            disabled={!isEditing}  // Deshabilitado si no está en modo edición
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={editableMember.email}
            onChange={handleInputChange}
           disabled={!isEditing}  // Deshabilitado si no está en modo edición
          />
        </div>
        <h3>Información sobre la membresía</h3>
        <div>
         <label>Tipo de membresía: </label>
         <select
           name="membresia.tipo"
           value={editableMember.membresia.tipo}
           onChange={handleInputChange}
            disabled={!isEditing}  // Deshabilitado si no está en modo edición
         >
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
        </div>
        <div>
          <label>Estado: </label>
         <select
            name="membresia.estado"
           value={editableMember.membresia.estado}
           onChange={handleInputChange}
           disabled={!isEditing}  // Deshabilitado si no está en modo edición
          >
           <option value="activo">Activo</option>
           <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div>
          <label>Fecha de inicio: </label>
          <input
         type="date"
         name="membresia.fecha_inicio"
         value={editableMember.membresia.fecha_inicio ? editableMember.membresia.fecha_inicio.split('T')[0] : ''}
         disabled={true}  // Deshabilitado
        />
        </div>
      <div>
        <label>Fecha de fin: </label>
        <input
         type="date"
         name="membresia.fecha_fin"
         value={editableMember.membresia.fecha_fin ? editableMember.membresia.fecha_fin.split('T')[0] : ''}
         disabled={true}  // Deshabilitado
      />
      </div>
    </div>
{/* Rutinas y ejercicios */}
<div className="right-column">
        <h3>Rutinas y ejercicios</h3>
        {editableMember.rutinas && editableMember.rutinas.length > 0 ? (
          editableMember.rutinas.map((rutina, index) => (
            <div key={index} className="rutina">
              <h4>Rutina: {rutina.nombre}</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Ejercicio</th>
                    <th>Series</th>
                    <th>Repeticiones</th>
                    <th>Peso (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {rutina.ejercicios.map((ejercicio, idx) => (
                    <tr key={idx}>
                      <td>{ejercicio.nombre}</td>
                      <td>{ejercicio.series}</td>
                      <td>{ejercicio.repeticiones}</td>
                      <td>{ejercicio.peso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No hay rutinas asignadas.</p>
        )}
      </div>
    </div>

    <div className="button-container">
      {isEditing ? (
        <button onClick={handleSaveClick}>Guardar Cambios</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Modificar</button>
      )}

      <button onClick={onBack}>Volver a la lista</button>
    </div>
    </div>
  );
};



export default MemberDetails;
