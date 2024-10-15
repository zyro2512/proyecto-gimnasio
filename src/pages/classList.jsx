import { useState, useEffect } from 'react';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
    // Estado para controlar qué componente mostrar (lista o detalle)
    const [showDetails, setShowDetails] = useState(false);

    // Función para alternar entre mostrar la lista de miembros o el detalle
    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
    
  useEffect(() => {
    // Fetching routines from the backend
    fetch('http://localhost:3000/api/classes')
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error('Error fetching classes:', error));
  }, []); // The empty array ensures that this effect only runs once (when the component mounts)

  return (
    <div>
      <h3>Lista de Clases</h3>
      <ul>
        {classes.map(class1 => (
          <li key={class1._id}>{class1.nombre} {class1.nivel} <button onClick={toggleDetails}>Ver</button></li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
