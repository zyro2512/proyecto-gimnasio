import { useState, useEffect } from 'react';

const MemberList = () => {
  const [members, setMembers] = useState([]);

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
      <ul>
        {members.map(member => (
          <li key={member._id}>{member.nombre} {member.apellido}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
