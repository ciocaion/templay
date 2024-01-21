import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

interface MetadataInfo {
  seo: string;
  alt: {
    title: string;
    text: string;
  }[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadataInfo: MetadataInfo;
}

function ModalMetadata({ isOpen, onClose, metadataInfo }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Metadata Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            <b>SEO:</b> {metadataInfo.seo}
          </Text>
          {metadataInfo.alt.map((altItem, index) => (
            <React.Fragment key={index}>
              <Text style={{ marginTop: "16px" }}>
                <b>Image Title:</b> {altItem.title}
              </Text>
              <Text>
                <b>ALT Text:</b> {altItem.text}
              </Text>
            </React.Fragment>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalMetadata;
