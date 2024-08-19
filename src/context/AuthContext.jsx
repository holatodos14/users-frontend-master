/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { getMe, loginUser, registerUser } from '../services/authService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const rutasIgnoradas = ['/', '/register'];

  const [user, setUser] = useState(null);

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onError: data => alert(data.response.data.message),
    onSuccess: ({ data }) => {
      localStorage.setItem('tokenLogin', data.token);
      setUser(data.user);
      navigate('/dashboard');
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: registerUser,
    onError: data => alert(data.response.data.message),
    onSuccess: ({ data }) => {
      alert(data.message);
      navigate('/');
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    enabled: !rutasIgnoradas.includes(pathname),
  });

  const logout = () => {
    localStorage.removeItem('tokenLogin');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (data && !isLoading) {
      setUser(data);
    }
  }, [data, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginMutation,
        registerMutation,
        isLoading,
        logout,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
