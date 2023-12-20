import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, VStack } from "@chakra-ui/react";
import ButtonIcon from '../ui/iconbutton';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { GridLayoutType } from "../builder/gridcomponent";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (componentType: string, layoutType?: GridLayoutType) => void; // New prop for handling selection
}

function Sidebar({ isOpen, onClose, onSelect  }: SidebarProps) {
  // Banner menu items

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Component Selection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing="20px">
          <ButtonIcon icon={<GridViewOutlinedIcon />} 
          text="Banner" 
          type="BANNER" // Ensure this prop is passed if required by ButtonIcon
          onClick={() => onSelect('BANNER')}/>
          <ButtonIcon icon={<GridViewOutlinedIcon />} 
          text="Hero" 
          type="HERO" // Ensure this prop is passed if required by ButtonIcon
          onClick={() => onSelect('HERO')}/>
            <ButtonIcon 
              icon={<GridViewOutlinedIcon />} 
              text="2 Column Equal" 
              type="GRID"
              onClick={() => onSelect('GRID', 'twoColumnEqual')}
            />
            <ButtonIcon 
              icon={<GridViewOutlinedIcon />} 
              text="2 Column Wide Left"
              type="GRID"
              onClick={() => onSelect('GRID', 'twoColumnWideLeft')}
            />
            <ButtonIcon 
              icon={<GridViewOutlinedIcon />} 
              text="2 Column Wide Right" 
              type="GRID"
              onClick={() => onSelect('GRID', 'twoColumnWideRight')}
            />
            <ButtonIcon 
              icon={<GridViewOutlinedIcon />} 
              text="3 Column Equal" 
              type="GRID"
              onClick={() => onSelect('GRID', 'threeColumnEqual')}
            />
            <ButtonIcon 
              icon={<GridViewOutlinedIcon />} 
              text="Single Column" 
              type="GRID"
              onClick={() => onSelect('GRID', 'singleColumn')}
            />          
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Sidebar;
