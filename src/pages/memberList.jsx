import { useState, useEffect } from 'react';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleDetails = (member) => {
    setSelectedMember(member);
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/members')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  return (
    <div>
      <h3>Lista de Miembros</h3>
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
              <td><button onClick={() => toggleDetails(member)}>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>Nombre: {selectedMember.nombre}</p>
            <p>Apellido: {selectedMember.apellido}</p>
            <p>Email: {selectedMember.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberList;
