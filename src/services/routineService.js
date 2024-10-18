// src/services/routineService.js

let selectedRoutine = null; // Variable para almacenar la rutina seleccionada

const routineService = {
  // Método para establecer la rutina seleccionada
  setSelectedRoutine(routine) {
    selectedRoutine = routine;
  },

  // Método para obtener la rutina seleccionada
  getSelectedRoutine() {
    return selectedRoutine;
  },

  // Método para limpiar/desseleccioando las rutina seleccionada
  clearSelectedRoutine(){
    selectedRoutine = null;

  }
};

export default routineService;
