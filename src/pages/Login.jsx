import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
  const { loginMutation } = useContext(AuthContext);

  const handleLogin = async e => {
    e.preventDefault();
    const data = {
      usernameOrEmail: e.target.usernameOrEmail.value,
      password: e.target.password.value,
    };

    await loginMutation.mutateAsync(data);
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Nombre de usuario o correo electrónico:
          <input type='text' name='usernameOrEmail' required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type='text' name='password' required />
        </label>
        <br />
        <button type='submit'>Ingresar</button>
      </form>
      <Link to='/register'>Registrarse</Link>
    </main>
  );
}

export default Login;
