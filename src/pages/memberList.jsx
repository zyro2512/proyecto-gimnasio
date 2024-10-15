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
        <div id="myModal" className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <span className="close" onClick={() => setShowModal(false)} style={closeStyle}>&times;</span>
            <p>Nombre: {selectedMember.nombre}</p>
            <p>Apellido: {selectedMember.apellido}</p>
            <p>Email: {selectedMember.email}</p>
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

export default MemberList;
