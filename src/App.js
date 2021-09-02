import React from 'react';
import { Header } from "./components/Header";
import { LoginModal } from "./components/LoginModal";
import { Product } from "./components/Product";
import { WebProvider } from "./context/appContext";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <WebProvider>
        <LoginModal />
        <Header />
        <Product />
      </WebProvider>
    </AuthProvider>
  );
}

export default App;
