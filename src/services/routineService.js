// src/services/routineService.js

let selectedRoutine = null; // Variable para almacenar la rutina seleccionada

const routineService = {
  // Método para establecer la rutina seleccionada
  setSelectedMember(routine) {
    selectedRoutine = routine;
  },

  // Método para obtener la rutina seleccionada
  getSelectedMember() {
    return selectedRoutine;
  },

  // Método para limpiar/desseleccioando las rutina seleccionada
  clearSelectedMember(){
    selectedRoutine = null;

  }
};

export default routineService;
