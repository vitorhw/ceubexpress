import Modal from 'react-modal';
import { useState } from 'react';
import { Box, Image, HStack, Flex, Spacer, useColorMode } from '@chakra-ui/react';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  content: {
    maxWidth: '1300px',
    width: '80%',
    height: '512px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 'none',
    margin: 'none',
    overflow: 'hidden',
    border: 'none'
  }
}

export function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(true)

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
        <Box boxSize="50%">
          Login
        </Box>
        <Spacer />
        <Image height="512px" src='./images/login.jpeg' alt="login-image"/>
      </Flex>


    </Modal>
  );
}