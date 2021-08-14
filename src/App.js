import { useState } from "react";
import { Header } from "./components/Header";
import { LoginModal } from "./components/LoginModal";
import { Product } from "./components/Product";

function App() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    function handleLoginClose() {
      setIsLoginModalOpen(false);
    }
    
  return (
    <>
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLoginClose={handleLoginClose}
      />
      <Header setIsLoginModalOpen={setIsLoginModalOpen} />

      <Product />
    </>
  );
}

export default App;
