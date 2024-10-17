import { useState } from 'react';

const ClassCreate = () => {
  // Estado para los campos del formulario
  const [newClass, setNewClass] = useState({
    nombre: '',
    nivel: 'Principiante', // Nivel predeterminado
    entrenador: '',
    duracion: 0,
    horarios: [{ dia: '', hora: '' }],
    cupos_disponibles: 0,
    activa: true
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  // Manejar cambios en los horarios
  const handleHorarioChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHorarios = [...newClass.horarios];
    updatedHorarios[index][name] = value;
    setNewClass({ ...newClass, horarios: updatedHorarios });
  };

  // Añadir un nuevo horario
  const addHorario = () => {
    setNewClass({ ...newClass, horarios: [...newClass.horarios, { dia: '', hora: '' }] });
  };

  // Remover un horario
  const removeHorario = (index) => {
    const updatedHorarios = newClass.horarios.filter((_, i) => i !== index);
    setNewClass({ ...newClass, horarios: updatedHorarios });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos necesarios no estén vacíos
    if (!newClass.nombre || !newClass.entrenador || newClass.duracion <= 0 || newClass.cupos_disponibles <= 0) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Realizar la solicitud POST al backend para crear la clase
    fetch('http://localhost:3000/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClass)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al crear la clase');
        }
        return response.json();
      })
      .then(() => {
        setSuccess(true);
        setNewClass({
          nombre: '',
          nivel: 'Principiante',
          entrenador: '',
          duracion: 0,
          horarios: [{ dia: '', hora: '' }],
          cupos_disponibles: 0,
          activa: true
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Agregar Nueva Clase</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Clase creada exitosamente.</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={newClass.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Nivel:</label>
          <select
            name="nivel"
            value={newClass.nivel}
            onChange={handleInputChange}
            required
          >
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>

        <div>
          <label>Entrenador:</label>
          <input
            type="text"
            name="entrenador"
            value={newClass.entrenador}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Duración (minutos):</label>
          <input
            type="number"
            name="duracion"
            value={newClass.duracion}
            onChange={handleInputChange}
            required
          />
        </div>

        <h3>Horarios</h3>
        {newClass.horarios.map((horario, index) => (
          <div key={index}>
            <label>Día:</label>
            <input
              type="text"
              name="dia"
              value={horario.dia}
              onChange={(e) => handleHorarioChange(index, e)}
              required
            />
            <label>Hora:</label>
            <input
              type="time"
              name="hora"
              value={horario.hora}
              onChange={(e) => handleHorarioChange(index, e)}
              required
            />
            {index > 0 && (
              <button type="button" onClick={() => removeHorario(index)}>
                Remover Horario
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addHorario}>
          Agregar Horario
        </button>

        <div>
          <label>Cupos Disponibles:</label>
          <input
            type="number"
            name="cupos_disponibles"
            value={newClass.cupos_disponibles}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>¿Clase activa?</label>
          <input
            type="checkbox"
            name="activa"
            checked={newClass.activa}
            onChange={(e) => setNewClass({ ...newClass, activa: e.target.checked })}
          />
        </div>

        <button type="submit">Crear Clase</button>
      </form>
    </div>
  );
};

export default ClassCreate;


