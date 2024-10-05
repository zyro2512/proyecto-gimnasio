import { useState, useEffect } from 'react';

const MemberCreate = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    altura: '',
    peso: '',
    email: '',
    membresia:{
      tipo: 'mensual',
      fecha_inicio: new Date().toISOString(), // Establece la fecha actual en formato ISO
      fecha_fin: '',
      estado: 'activo' 
    }     
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Miembro creado:', data);
      // Limpiar el formulario o hacer otras acciones después de crear el miembro
    })
    .catch(err => console.error('Error al crear miembro:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label>
      <br />
      <label>
        Apellido:
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
      </label>
      <br />
      <label>
        Fecha de Nacimiento:
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
      </label>
      <br />
      <label>
        Altura:
        <input type="number" name="altura" value={formData.altura} onChange={handleChange} />
      </label>
      <br />
      <label>
        Peso:
        <input type="number" name="peso" value={formData.peso} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Tipo de Membresía:
        <select name="tipoMembresia" value={formData.tipoMembresia} onChange={handleChange}>
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MemberCreate;
