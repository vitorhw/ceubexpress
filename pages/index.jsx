import { Header } from "../components/Header";
import { LoginModal } from "../components/LoginModal";
import { ProductList } from "../components/ProductList";
import { useState } from "react"

function Home() {
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

      <ProductList />
    </>
  )
}

export default Home
