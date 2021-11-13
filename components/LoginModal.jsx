import Modal from 'react-modal';
import { Image, Flex, Spacer, Icon, useColorMode } from '@chakra-ui/react';
import { LoginInput } from './LoginInput';
import { RiCloseFill } from 'react-icons/ri';

export function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
  handleLoginClose,
}) {
  const { colorMode, toggleColorMode } = useColorMode();

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
      background: colorMode === 'light' ? 'white' : 'rgba(32, 27, 45, 1)',
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

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onRequestClose={handleLoginClose}
      style={modalStyles}
      contentLabel="Modal"
    >
      <Flex>
        <Spacer />
        <LoginInput handleLoginClose={handleLoginClose} />
        <Spacer />
        <Image
          height="512px"
          src={
            colorMode === 'light'
              ? '/login-white.jpg'
              : '/login.jpg'
          }
          alt="login-image"
        />
        <Icon
          cursor="pointer"
          fontSize="1.5rem"
          position="absolute"
          top="1rem"
          right="1rem"
          as={RiCloseFill}
          onClick={handleLoginClose}
        />
      </Flex>
    </Modal>
  );
}
