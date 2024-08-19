import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:5000'
    : "" ,
  timeout: 1000,
  withCredentials: true,
})

export const AuthService = {
  registerUser: async (user) => {
    const { data } = await api.post('auth/register', {
      email: user.email,
      password: user.password,
    })
    return data
  },
  loginUser: async (user) => {
    const { data } = await api.post('auth/login', {
      email: user.email,
      password: user.password,
    })
    return data
  },
  oauth: async (client) => {
    const { data } = await api.get(`auth/${client}`)
    return data.url
  },
  logoutUser: () => {
    return api.post('auth/logout')
  },
}

export const UserService = {
  getUserInfo: async (token) => {
    const config = token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : undefined
    const { data } = await api.get('/user', config)
    return data
  },
  updateUser: async (updatedUser) => {
    const { data } = await api.put('/user', updatedUser)
    return data
  },
}
