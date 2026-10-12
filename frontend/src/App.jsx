import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CanchaPage from "./pages/CanchaPage.jsx";
import ClientePage from "./pages/ClientePage.jsx";
import NuevoClientePage from "./pages/NuevoClientePage.jsx";
import EditarClientePage from "./pages/EditarClientePage.jsx";
import ReservaPage from "./pages/ReservaPage.jsx";

function App() {
  return (
    <Router>
      {/* Barra de navegación superior con el mismo estilo limpio */}
      <nav style={navStyle}>
        <div style={navContainerStyle}>
          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>⚽ Alquiler de Canchas</h2>
          <div style={navLinksStyle}>
            <Link to="/" style={linkStyle}>Canchas</Link>
            <Link to="/clientes" style={linkStyle}>Clientes</Link>
            <Link to="/reservas" style={linkStyle}>Reservas</Link>
          </div>
        </div>
      </nav>

      {/* Contenedor de Rutas */}
      <div style={{ paddingTop: '20px' }}>
        <Routes>
          <Route path="/" element={<CanchaPage />} />
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/clientes/nuevo" element={<NuevoClientePage />} />
          <Route path="/clientes/editar/:id" element={<EditarClientePage />} />
          <Route path="/reservas" element={<ReservaPage />} />
          {/* Ruta por defecto si escriben cualquier otra cosa */}
          <Route path="*" element={<CanchaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Estilos rápidos en línea para el menú (puedes pasarlos a tu CSS si prefieres)
const navStyle = {
  backgroundColor: '#1a252f',
  padding: '15px 20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const navContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navLinksStyle = {
  display: 'flex',
  gap: '20px',
};

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '0.95rem',
  transition: 'color 0.2s',
};

export default App;