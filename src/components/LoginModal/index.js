import Modal from 'react-modal';
import { useState } from 'react';
import { Image, Flex, Spacer, useColorMode, Icon } from '@chakra-ui/react';
import { LoginInput } from './LoginInput';
import { RiCloseFill } from 'react-icons/ri'


export function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    content: {
      background: colorMode === 'light' ? 'white' : '#171717',
      maxWidth: '800px',
      width: '80%',
      height: '512px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: 'none',
      margin: 'none',
      overflow: 'hidden',
      border: 'none',
    },
  };

  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      contentLabel="Modal"
    >
      <Flex>
        <Spacer />
        <LoginInput />
        <Spacer />
        <Image height="512px" src="./images/login_white.jpeg" alt="login-image" />
        <Icon 
          cursor="pointer" 
          fontSize='1.5rem' 
          position='absolute' 
          top='1rem' 
          right='1rem'
          as={RiCloseFill}
          onClick={handleClose} 
          />
      </Flex>
    </Modal>
  );
}
