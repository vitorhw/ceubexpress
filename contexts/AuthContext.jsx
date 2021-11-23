import { useToast, } from '@chakra-ui/react';
import { createContext } from 'react';
import { api } from '../services/api'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import axios from 'axios'
import jwt from 'jsonwebtoken'
import Router from 'next/router'


export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const toast = useToast();

  const isAuthenticated = !!user;

  async function retrieveUser(token) {
    const json = jwt.decode(token);
    try {
      const response = await api.get(`user/${json.email}`)
      setUser(response.data)
    } catch {
      return
    }
  }

  useEffect(() => {
    const { 'ceubexpress-token': token } = parseCookies();

    if (token) {
      retrieveUser(token)
    }
  }, [])

  async function verifyCaptcha(context) {
    const reCaptchaToken = await executeRecaptcha(context);

    const reCaptchaResponse = await axios.post("/api/register", {
      captcha: reCaptchaToken,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reCaptchaResponse.data.score >= 0.3) {
      return true
    }

    return false
  }

  async function signUp({ name, email, password }) {
    const reCaptchaTokenSuccess = await verifyCaptcha("Register");

    if (reCaptchaTokenSuccess) {
      const response = await api.post('user', {
        email,
        password,
        name,
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
        toast({
          status: 'success',
          description: 'Conta criada com sucesso, bem-vindo!',
          duration: 9000,
          isClosable: true,
        })
        await signIn({ email, password });
      }
    } else {
      toast({
        status: 'error',
        description: 'Você provavelmente é um robô',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  async function signIn({ email, password }) {
    const reCaptchaTokenSuccess = await verifyCaptcha("SignIn");

    if (reCaptchaTokenSuccess) {
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

        Router.reload()
      }
    } else {
      toast({
        status: 'error',
        description: 'Você provavelmente é um robô',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  async function signOut() {
    destroyCookie(undefined, 'ceubexpress-token');
    setUser(null);
    Router.reload()
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signUp, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}