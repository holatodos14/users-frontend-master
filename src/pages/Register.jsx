import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Register() {
  const { registerMutation } = useContext(AuthContext);

  const handleRegister = async e => {
    e.preventDefault();
    const data = new FormData(e.target);

    await registerMutation.mutateAsync(data);
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Nombre:
          <input type='text' name='fName' required />
        </label>
        <br />
        <label>
          Nombre de usuario:
          <input type='text' name='username' required />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input type='email' name='email' required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type='text' name='password' required />
        </label>
        <br />
        <label>
          Imagen:
          <input type='file' name='image' required accept='image/*' />
        </label>
        <br />
        <button type='submit'>Registrar</button>
      </form>
      <Link to='/'>Iniciar sesión</Link>
    </main>
  );
}

export default Register;
