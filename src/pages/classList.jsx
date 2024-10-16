import { useState, useEffect } from 'react';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const toggleDetails = (class1) => {
    setSelectedClass(class1);
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/classes')
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error('Error fetching classes:', error));
  }, []);

  return (
    <div>
      <h3>Lista de Clases</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nivel</th>
            <th>Entrenador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(class1 => (
            <tr key={class1._id}>
              <td>{class1.nombre}</td>
              <td>{class1.nivel}</td>
              <td>{class1.entrenador}</td>
              <td><button onClick={() => toggleDetails(class1)}>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>Nombre: {selectedClass.nombre}</p>
            <p>Nivel: {selectedClass.nivel}</p>
            <p>Entrenador: {selectedClass.entrenador}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
