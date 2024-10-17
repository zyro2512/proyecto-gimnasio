import { useState, useEffect } from 'react';
import MemberDetails from './MemberDetails';  
import memberService from '../services/memberService';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // Llamada al backend para obtener la lista de miembros
    fetch('http://localhost:3000/api/members')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);  // Almacenar el miembro seleccionado
    memberService.setSelectedMember(member);   //También lo almacenamos en el servicio
  };

  // Función para volver a la lista de miembros
  const handleBackToList = () => {
    memberService.setSelectedMember(null);  //En el servicio cambiamos de miembro seleccionado
    setSelectedMember(null);  // Deseleccionamos al miembro
  };

  // Si hay un miembro seleccionado, mostramos el componente de detalles
  if (selectedMember) {
    return <MemberDetails onBack={handleBackToList} />;
  }

  return (
    <div>
      <h2>Lista de Miembros</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member._id}>
              <td>{member.nombre}</td>
              <td>{member.apellido}</td>
              <td>{member.email}</td>
              <td><button onClick={() => handleMemberClick(member)}>Ver Detalles</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
