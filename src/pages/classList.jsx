import { useState, useEffect } from 'react';
import ClassDetails from './classDetails';  // Asegúrate de tener este componente
import ClassDelete from './classDelete';    // Asegúrate de tener este componente
import classService from '../services/classService'; // Importamos classService

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedToDelClass, setSelectedToDelClass] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/classes')
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error('Error fetching classes:', error));
  }, []);

  const handleClassClick = (class1) => {
    setSelectedClass(class1);
    classService.setSelectedClass(class1);
  };

  const handleDeleteClick = (class1) => {
    setSelectedToDelClass(class1);
    classService.setSelectedClass(class1);
  };

  const handleBackToList = () => {
    classService.setSelectedClass(null);
    setSelectedClass(null);
  };

  if (selectedClass) {
    return <ClassDetails onBack={handleBackToList} />;
  }

  if (selectedToDelClass) {
    return <ClassDelete />;
  }

  return (
    <div>
      <h2>Lista de Clases</h2>
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
              <td>
                <button onClick={() => handleClassClick(class1)}>Ver Detalles</button>
                <button className="botonbaja" onClick={() => handleDeleteClick(class1)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
