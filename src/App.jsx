import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Gimnasio</h1>
          <h2>Desine Me Vexare</h2>
      </header>
      <nav><a href="">Membresias</a>
      <a href="">Reservas de clases</a>
      <a href="">rutinas de ejercicio</a>
      </nav>
    </>
  )
}

export default App
