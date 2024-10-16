// src/services/memberService.js

let selectedMember = null; // Variable para almacenar el miembro seleccionado

const memberService = {
  // Método para establecer el miembro seleccionado
  setSelectedMember(member) {
    selectedMember = member;
  },

  // Método para obtener el miembro seleccionado
  getSelectedMember() {
    return selectedMember;
  }
};

export default memberService;
