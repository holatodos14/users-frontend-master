import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { isLoading, user, logout } = useContext(AuthContext);

  if (isLoading) {
    return <div>CARGANDO...</div>;
  }

  return (
    <main>
      <button onClick={logout}>Cerrar sesión</button>
      <h1>Bienvenido</h1>
      <img
        src={`http://localhost:3000/api/users/image/${user?.image}`}
        alt={user?.f_name}
        height='200'
      />
      <p>Esta es tu información:</p>
      <p>
        Nombre: {user?.f_name} {user?.m_name}
      </p>
      <p>Apellidos: {user?.l_name ?? 'NO REGISTRADO'}</p>
      <p>Correo: {user?.email}</p>
    </main>
  );
}

export default Dashboard;
