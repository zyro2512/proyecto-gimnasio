import { useState, useEffect } from 'react';
import routineService from '../services/routineService'; // Importamos routineService

const RoutineDetails = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando
  const [editableRoutine, setEditableRoutine] = useState(null); // Estado para manejar la rutina editable

  useEffect(() => {
    const selectedRoutine = routineService.getSelectedRoutine(); // Obtenemos la rutina seleccionada del servicio
    if (selectedRoutine) {
      setEditableRoutine({ ...selectedRoutine }); // Creamos una copia para editar
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableRoutine({
      ...editableRoutine,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    // Guardar los cambios en el backend
    fetch(`http://localhost:3000/api/routines/${editableRoutine._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableRoutine),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos actualizados:', data);
        setIsEditing(false); // Salir del modo edición
        routineService.setSelectedRoutine(editableRoutine); // Actualizar la rutina en el servicio también
      })
      .catch(error => console.error('Error updating routine:', error));
  };

  if (!editableRoutine) {
    return <div>Cargando detalles de la rutina...</div>;
  }

  return (
    <div>
      <h2>Detalles de la Rutina</h2>
      <div className="container">
        <div className="left-column">
          <h3>Información de la Rutina</h3>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="nombre"
              value={editableRoutine.nombre}
              onChange={handleInputChange}
              disabled={!isEditing} // Deshabilitado si no está en modo edición
            />
          </div>
          <div>
            <label>Descripción: </label>
            <input
              type="text"
              name="descripcion"
              value={editableRoutine.descripcion}
              onChange={handleInputChange}
              disabled={!isEditing} // Deshabilitado si no está en modo edición
            />
          </div>
          <div>
            <label>Nivel: </label>
            <select
              name="nivel"
              value={editableRoutine.nivel}
              onChange={handleInputChange}
              disabled={!isEditing} // Deshabilitado si no está en modo edición
            >
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
        </div>
        <div className="right-column">
          <h3>Ejercicios</h3>
          {editableRoutine.ejercicios && editableRoutine.ejercicios.length > 0 ? (
            editableRoutine.ejercicios.map((ejercicio, index) => (
              <div key={index} className="ejercicio">
                <h4>Ejercicio: {ejercicio.nombre}</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Series</th>
                      <th>Repeticiones</th>
                      <th>Peso (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{ejercicio.series}</td>
                      <td>{ejercicio.repeticiones}</td>
                      <td>{ejercicio.peso}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>No hay ejercicios asignados.</p>
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

export default RoutineDetails;
