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
              <td>
              <button onClick={() => toggleDetails(member)}>Ver</button>
              <button className='botonbaja' onClick={() => toggleDetails(member)}>Baja</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>Nombre: {selectedRoutine.nombre}</p>
            <p>Descripción: {selectedRoutine.descripcion}</p>
            <p>Nivel: {selectedRoutine.nivel}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineList;
