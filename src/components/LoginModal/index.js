import Modal from 'react-modal';
import { useContext } from 'react';
import { Image, Flex, Spacer, Icon, useColorMode } from '@chakra-ui/react';
import { LoginInput } from './LoginInput';
import { RiCloseFill } from 'react-icons/ri';
import { WebContext } from '../../context/appContext';

export function LoginModal() {
  const { colorMode, } = useColorMode();
  const {
    isLoginModalOpen,
    handleFunctionLoginModal
  } = useContext(WebContext);

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
      onRequestClose={handleFunctionLoginModal}
      style={modalStyles}
      contentLabel="Modal"
    >
      <Flex>
        <Spacer />
        <LoginInput />
        <Spacer />
        <Image
          height="512px"
          src={
            colorMode === 'light'
              ? '/images/login-white.jpg'
              : '/images/login.jpg'
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
          onClick={handleFunctionLoginModal}
        />
      </Flex>
    </Modal>
  );
}
