// src/services/classService.js

let selectedClass = null; // Variable para almacenar la clase seleccionada

const classService = {
  // Método para establecer la clase seleccionada
  setSelectedClass(class1) {
    selectedClass = class1;
  },

  // Método para obtener la clase seleccionada
  getSelectedClass() {
    return selectedClass;
  },

  // Método para limpiar/desseleccioando la clase seleccionada
  clearSelectedClass(){
    selectedClass = null;

  }
};

export default classService;
