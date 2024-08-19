import axios from 'axios';

export const loginUser = async ({ usernameOrEmail, password }) => {
  const response = await axios.post('http://localhost:3000/api/auth/login', {
    usernameOrEmail,
    password,
  });
  return response;
};

export const registerUser = async (data) => {
  const response = await axios.post('http://localhost:3000/api/users', data);
  return response;
};

export const getMe = async () => {
  const token = localStorage.getItem('tokenLogin');
  const response = await axios.get('http://localhost:3000/api/auth/me', {
    headers: { Authorization: token },
    timeout: 3000
  });
  return response.data
};
