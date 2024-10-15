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
        <div id="myModal" className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <span className="close" onClick={() => setShowModal(false)} style={closeStyle}>&times;</span>
            <p>Nombre: {selectedClass.nombre}</p>
            <p>Nivel: {selectedClass.nivel}</p>
            <p>Entrenador: {selectedClass.entrenador}</p>
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

export default ClassList;
