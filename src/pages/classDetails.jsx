import { useState, useEffect } from 'react';
import classService from '../services/classService';


const ClassDetails = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);  // Estado para saber si estamos editando
  const [editableClass, setEditableClass] = useState(null);  // Estado para manejar la clase editable


  useEffect(() => {
    const selectedClass = classService.getSelectedClass();  // Obtenemos la clase seleccionada del servicio
    if (selectedClass) {
      setEditableClass({ ...selectedClass });  // Creamos una copia para editar
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
 
    if (name.startsWith('horarios-')) {
      // Obtenemos el índice y el campo (dia u hora) a partir del name
      const [_, index, field] = name.split('-');  // Ejemplo: "horarios-0-dia"
 
      // Actualizamos el array de horarios
      const updatedHorarios = [...editableClass.horarios];  // Hacemos una copia del array
      updatedHorarios[index][field] = value;  // Actualizamos el campo correspondiente
 
      // Guardamos la nueva clase con los horarios actualizados
      setEditableClass({
        ...editableClass,
        horarios: updatedHorarios
      });
    } else {
      // Actualización para los campos que no son anidados
      setEditableClass({
        ...editableClass,
        [name]: value,
      });
    }
  };
 
 
 
  const handleSaveClick = () => {
    // Guardar los cambios en el backend
    fetch(`http://localhost:3000/api/classes/${editableClass._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableClass),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos actualizados:', data);
        setIsEditing(false); // Salir del modo edición
        classService.setSelectedClass(editableClass); // Actualizar la clase en el servicio también
      })
      .catch(error => console.error('Error updating class:', error));
  };


  if (!editableClass) {
    return <div>Cargando detalles de la clase...</div>;
  }


    return (
      <div>
        <h2>Detalles de la Clase</h2>
        <div className="container">
          {/* Datos generales de la clase */}
          <div className="left-column">
            <h3>Información de la clase</h3>
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                name="nombre"
                value={editableClass.nombre}
                onChange={handleInputChange}
                disabled={!isEditing}  // Deshabilitado si no está en modo edición
              />
            </div>
            <div>
              <label>Nivel: </label>
              <select
                name="nivel"
                value={editableClass.nivel}
                onChange={handleInputChange}
                disabled={!isEditing}  // Deshabilitado si no está en modo edición
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
            <div>
              <label>Entrenador: </label>
              <input
                type="text"
                name="entrenador"
                value={editableClass.entrenador}
                onChange={handleInputChange}
                disabled={!isEditing}  // Deshabilitado si no está en modo edición
              />
            </div>
            <div>
              <label>Duración (minutos): </label>
              <input
                type="number"
                name="duracion"
                value={editableClass.duracion}
                onChange={handleInputChange}
                disabled={!isEditing}  // Deshabilitado si no está en modo edición
              />
            </div>
            <div>
              <label>Estado: </label>
              <select
                name="activa"
                value={editableClass.activa ? 'activo' : 'inactivo'}
                onChange={handleInputChange}
                disabled={!isEditing}  // Deshabilitado si no está en modo edición
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>


 
            <h3>Días y horarios</h3>
            {editableClass.horarios && editableClass.horarios.length > 0 ? (
              editableClass.horarios.map((horario, index) => (
                <div key={index} className="horario">
                  <h4>Horario {index + 1}</h4>
                  <div>
                    <label>Día: </label>
                    <select
                      name={`horarios-${index}-dia`}  // Cambia el name para que coincida con el handleInputChange
                      value={horario.dia}
                      onChange={handleInputChange}
                      disabled={!isEditing}  // Deshabilitado si no está en modo edición
                    >
                      <option value="Lunes">Lunes</option>
                      <option value="Martes">Martes</option>
                      <option value="Miércoles">Miércoles</option>
                      <option value="Jueves">Jueves</option>
                      <option value="Viernes">Viernes</option>
                      <option value="Sábado">Sábado</option>
                      <option value="Domingo">Domingo</option>
                    </select>
                  </div>
                  <div>
                    <label>Hora: </label>
                    <input
                      type="time"
                      name={`horarios-${index}-hora`}  // Cambia el name para que coincida con el handleInputChange
                      value={horario.hora}
                      onChange={handleInputChange}
                      disabled={!isEditing}  // Deshabilitado si no está en modo edición
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No hay horarios disponibles.</p>
            )}
 
          </div>
        </div>
 
        <div className="button-container">
          {isEditing ? (
            <button onClick={handleSaveClick}>Guardar Cambios</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Modificar</button>
          )}
          <button onClick={() => window.location.href = '/classes'}>Volver a la lista</button>
        </div>
      </div>
    );
  };
 
  export default ClassDetails;