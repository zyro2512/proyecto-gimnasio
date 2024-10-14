import { useState, useEffect } from 'react';

const RoutineCreate = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    duracion: '',
    nivel: '',
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

    fetch('http://localhost:3000/api/routines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Rutina creada:', data);
      // Limpiar el formulario o hacer otras acciones después de crear la rutina
    })
    .catch(err => console.error('Error al crear la rutina:', err));
  };

  return (
    <div>
    <h3>Agregar una nueva rutina al gimnasio</h3>
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label>
      <br />
      <label>
        Descripción:
        <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
      </label>
      <br />
      <label>
        Duración:
        <input type="number" name="duracion" value={formData.duracion} onChange={handleChange} />
      </label>
      <br />
      <label>
        Nivel:
        <input type="text" name="nivel" value={formData.nivel} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
    </div>
  );
};

export default RoutineCreate;
