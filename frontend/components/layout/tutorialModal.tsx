import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepSeparator,
  VStack,
  Text
} from '@chakra-ui/react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const steps = [
    { title: '' },
    { title: '' },
    { title: '' },
    { title: '' },
    { title: '' }
  ];

  const stepContents = [
    "Welcome message",
    "App Structure",
    "Create template",
    "Template page information",
    "Share the template"
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length
  });

  const nextStep = () => {
    if (activeStep === steps.length - 1) {
      onClose(); // Close the modal if it's the last step
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => setActiveStep(activeStep - 1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Template Application Tutorial</ModalHeader>
        <ModalCloseButton />
        <Box bg="white" p={4}>
          <Stepper index={activeStep}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <StepTitle>{step.title}</StepTitle>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        <ModalBody>
          <VStack spacing={4}>
            <Text>{stepContents[activeStep]}</Text>
            {/* Additional content for each step can go here */}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={prevStep} disabled={activeStep === 0}>
            Previous
          </Button>
          <Button onClick={nextStep} disabled={activeStep === steps.length - 1}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TutorialModal;
