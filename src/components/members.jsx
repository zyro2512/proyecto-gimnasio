import { useState, useEffect } from 'react';
import MemberList from './memberList';
import MemberCreate from './memberCreate';

const Members = () => {
  

  return (
    <div>
      <h2>Operaciones con miembros del gimnasio</h2>
      <MemberList />
      <MemberCreate />
    </div>
  );
};

export default Members;
