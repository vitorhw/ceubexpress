import React, { createContext, useEffect, useState } from 'react';
import Prismic from '@prismicio/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [products, setProductsData] = useState('');

    const Client = Prismic.client(process.env.REACT_APP_PRISMIC_END_POINT, {
        accessToken: process.env.REACT_APP_PRISMIC_ACCESS_TOKEN,
      });
      useEffect(() => {
        const fetchData = async () => {
          const response = await Client.query(
            Prismic.Predicates.at('document.type', 'products')
          );
          if (response) {
            setProductsData(response.results);
          }
        };
        fetchData();
      }, []);

    return (
        <AuthContext.Provider value={{
            products,
        }}>
            {children}
        </AuthContext.Provider>
    );
};