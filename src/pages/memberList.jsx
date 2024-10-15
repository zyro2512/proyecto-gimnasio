import { useState, useEffect } from 'react';

const MemberList = () => {
  const [members, setMembers] = useState([]);
    // Estado para controlar qué componente mostrar (lista o detalle)
    const [showDetails, setShowDetails] = useState(false);

    // Función para alternar entre mostrar la lista de miembros o el detalle
    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
    
  useEffect(() => {
    // Fetching members from the backend
    fetch('http://localhost:3000/api/members')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching members:', error));
  }, []); // The empty array ensures that this effect only runs once (when the component mounts)

  return (
    <div>
      <h3>Lista de Miembros</h3>
      <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>email</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {members.map(member => (
        <tr key={member._id}>
          <td>{member.nombre}</td>
          <td>{member.apellido}</td>
          <td>{member.email}</td>
          <td><button onClick={toggleDetails}>Ver</button></td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
};

export default MemberList;
