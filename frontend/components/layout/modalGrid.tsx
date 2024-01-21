import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
} from "@chakra-ui/react";
import ButtonIcon from "../ui/iconbutton";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

// Similar to ModalProps but could be adjusted as needed
interface NewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (componentType: string) => void;
}

function GridModal({ isOpen, onClose, onSelect }: NewModalProps) {
  // Define the specific items for this modal
  const items = [
    <ButtonIcon
      icon={<GridViewOutlinedIcon />}
      text="Banner"
      onClick={() => onSelect("BANNER")}
      type={"BANNER"}
    />,
    <ButtonIcon
      icon={<GridViewOutlinedIcon />}
      text="Hero"
      onClick={() => onSelect("HERO")}
      type={"BANNER"}
    />,
    <ButtonIcon
      icon={<GridViewOutlinedIcon />}
      text="Card Standard"
      onClick={() => onSelect("PAGE")}
      type={"BANNER"}
    />,
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a Component</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing="20px">
            {items.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default GridModal;
