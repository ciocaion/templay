import React, { useState } from "react";
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
  Image,
  Text,
} from "@chakra-ui/react";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const steps = [{ title: "" }, { title: "" }, { title: "" }, { title: "" }];

  const stepContents = [
    <>
      <Text fontSize="24px" textAlign="center" fontWeight="bold">
        Welcome to the GEA Template Creator
      </Text>
      <Text fontSize="18px" textAlign="center" marginBottom="32px">
        Where simplicity meets creativity in content design
      </Text>
      <Text mt={4} fontSize="18px" marginBottom="16px">
        Here is how the GEA Template creator can help you:
      </Text>
      <Text fontSize="14px">
        <li>
          <b>Effortless Template Creation:</b> Design page layouts quickly with
          our user-friendly interface.
        </li>
      </Text>
      <Text fontSize="14px">
        <li>
          {" "}
          <b>Live Component Rendering:</b> See your changes in real time,
          ensuring your design matches your vision.
        </li>
      </Text>
      <Text fontSize="14px">
        <li>
          <b>Save and Retrieve Layouts:</b> Save your designs with unique names
          and retrieve them for future use, enhancing efficiency.
        </li>
      </Text>
      <Text fontSize="14px">
        <li>
          <b>Collaboration Made Easy:</b> Share your templates with team
          members, fostering collaboration and consistency in your projects.
        </li>
      </Text>
      <Text fontSize="14px" marginBottom="32px">
        <li>
          <b>Flexibility in Design:</b> Enjoy the freedom to edit and modify
          your layouts anytime to suit your evolving content needs.
        </li>
      </Text>
      <Text fontStyle="italic" fontWeight="bold" mt={4} textAlign="center">
        Embrace the simplicity of digital design with the GEA Template Creator
        and transform the way you create content!
      </Text>
    </>,
    <>
      <Text fontSize="24px" textAlign="center" fontWeight="bold">
        Dashboard Structure
      </Text>
      <Text fontSize="18px" textAlign="center" marginBottom="32px">
        Check our quick guide on Dashboard information
      </Text>
      <Image src="/assets/dashboard-tutorial.gif" alt="Tutorial GIF" mt={4} />
    </>,
    <>
      <Text fontSize="24px" textAlign="center" fontWeight="bold">
        Create Template
      </Text>
      <Text fontSize="18px" textAlign="center" marginBottom="32px">
        Check our quick guide on creating a Template layout
      </Text>
      <Image src="/assets/create-tutorial.gif" alt="Tutorial GIF" mt={4} />
    </>,
    <>
      <Text fontSize="24px" textAlign="center" fontWeight="bold">
        Share Template
      </Text>
      <Text fontSize="18px" textAlign="center" marginBottom="32px">
        Check our quick guide on sharing a Template
      </Text>
      <Image src="/assets/retreive-tutorial.gif" alt="Tutorial GIF" mt={4} />
    </>,
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
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
      <ModalContent maxW="900px">
        <ModalHeader textAlign="center">
          Template Application Tutorial
        </ModalHeader>
        <ModalCloseButton />
        <Box bg="white" p={8}>
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
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TutorialModal;
