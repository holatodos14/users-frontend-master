import { useState, useEffect } from 'react'

export function useToken() {
  const [token, setToken] = useState(() => {

    return localStorage.getItem('auth-token') || ''
  })

  useEffect(() => {
    localStorage.setItem('auth-token', token)
  }, [token])

  function removeToken() {
    localStorage.removeItem('auth-token')
    setToken('')
  }

  return { token, setToken, removeToken }
}
