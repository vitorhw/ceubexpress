import { Header } from "../components/Header";
import { LoginModal } from "../components/LoginModal";
import { Product } from "../components/Product";
import { useState } from "react"

function index() {
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
  )
}

export default index
