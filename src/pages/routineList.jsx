import { useState, useEffect } from 'react';

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const toggleDetails = (routine) => {
    setSelectedRoutine(routine);
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/routines')
      .then(response => response.json())
      .then(data => setRoutines(data))
      .catch(error => console.error('Error fetching routines:', error));
  }, []);

  return (
    <div>
      <h3>Lista de Rutinas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Nivel</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {routines.map(routine => (
            <tr key={routine._id}>
              <td>{routine.nombre}</td>
              <td>{routine.descripcion}</td>
              <td>{routine.nivel}</td>
              <td><button onClick={() => toggleDetails(routine)}>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div id="myModal" className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <span className="close" onClick={() => setShowModal(false)} style={closeStyle}>&times;</span>
            <p>Nombre: {selectedRoutine.nombre}</p>
            <p>Descripción: {selectedRoutine.descripcion}</p>
            <p>Nivel: {selectedRoutine.nivel}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos en línea para mantener la simplicidad
const modalStyle = {
  display: 'block',
  position: 'fixed',
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0,0,0,0.4)'
};

const modalContentStyle = {
  backgroundColor: '#fefefe',
  margin: '15% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '80%'
};

const closeStyle = {
  color: '#aaa',
  float: 'right',
  fontSize: '28px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default RoutineList;
