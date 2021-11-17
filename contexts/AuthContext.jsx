import {
  useToast,
} from '@chakra-ui/react';
import { createContext } from 'react';
import { api } from '../services/api'
import { setCookie, parseCookies } from 'nookies'
import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const toast = useToast();

  const isAuthenticated = !!user;

  async function retrieveUser(token) {
    const json = jwt.decode(token);
    const response = await api.get(`user/${json.email}`)
    setUser(response.data)
  }

  useEffect(() => {
    const { 'ceubexpress-token': token } = parseCookies();

    if (token) {
      retrieveUser(token)
    }
  }, [])

  async function signIn({ email, password }) {
    const response = await api.post('api/auth/login', {
      email,
      password,
    }).catch((error) => {
      if (error.response) {
        toast({
          status: 'error',
          description: error.response.data.message,
          duration: 9000,
          isClosable: true,
        })
      }
    });

    if (response) {
      setCookie(undefined, 'ceubexpress-token', response.data.token, {
        maxAge: 60 * 60 * 24 * 14 // 14 days
      })

      setUser(response.data.userData)

      return true;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}