import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, Button, Image, Box } from '@chakra-ui/react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTutorial: () => void;
  backgroundImage: string;
}

const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose, onStartTutorial, backgroundImage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="800px" width="90%" margin="auto">
        <ModalBody p={0} position="relative">
          <Image src={backgroundImage} alt="Background" objectFit="cover" w="100%" h="100%" />
          <Button colorScheme="blue" position="absolute" right="4" bottom="4" onClick={onStartTutorial}>
            Start Tutorial
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IntroModal;
