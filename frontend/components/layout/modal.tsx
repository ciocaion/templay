import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack } from "@chakra-ui/react";
import CustomDropdown from '../builder/dropdown';
import ButtonIcon from '../ui/iconbutton';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { GridLayoutType } from "../builder/gridcomponent";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (componentType: string, layoutType?: GridLayoutType) => void;
}

function Modals({ isOpen, onClose, onSelect }: ModalProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Function to handle dropdown toggle
  const handleToggle = (dropdownId: string) => {
    if (openDropdown === dropdownId) {
      setOpenDropdown(null); // Close the dropdown if it's already open
    } else {
      setOpenDropdown(dropdownId); // Open the new dropdown
    }
  };
  

  // Banner item
  const bannerItem = (
    <ButtonIcon 
      icon={<GridViewOutlinedIcon />}
      text="Banner"
      onClick={() => onSelect('BANNER')} type={"BANNER"}    />
  );

  // Hero item
  const heroItem = (
    <ButtonIcon 
      icon={<GridViewOutlinedIcon />}
      text="Hero"
      onClick={() => onSelect('HERO')} type={"HERO"}    />
  );

  // Grid items
  const gridItems = [
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="2 Column Equal" onClick={() => onSelect('GRID', 'twoColumnEqual')} type={"GRID"} />,
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="2 Column Wide Left" onClick={() => onSelect('GRID', 'twoColumnWideLeft')} type={"GRID"} />,
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="2 Column Wide Right" onClick={() => onSelect('GRID', 'twoColumnWideRight')} type={"GRID"} />,
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="3 Column Equal" onClick={() => onSelect('GRID', 'threeColumnEqual')} type={"GRID"} />,
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="Single Column" onClick={() => onSelect('GRID', 'singleColumn')} type={"GRID"} />
  ];

  const pageItems = [
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="Image Block" onClick={() => onSelect('IMAGE')} type={"IMAGE"} />,
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="Card Standard" onClick={() => onSelect('PAGE')} type={"PAGE"} />,
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="Rich Text" onClick={() => onSelect('TEXT')} type={"TEXT"} />,
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Component Selection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing="20px">
            <CustomDropdown 
              buttonLabel="Banner" 
              menuItems={[bannerItem]} 
              isOpen={openDropdown === 'banner'} 
              onToggle={() => handleToggle('banner')}
            />
            <CustomDropdown 
              buttonLabel="Hero" 
              menuItems={[heroItem]} 
              isOpen={openDropdown === 'hero'} 
              onToggle={() => handleToggle('hero')}
            />
            <CustomDropdown 
              buttonLabel="Grids" 
              menuItems={gridItems} 
              isOpen={openDropdown === 'grids'} 
              onToggle={() => handleToggle('grids')}
            />
            <CustomDropdown 
              buttonLabel="Page Content" 
              menuItems={pageItems} 
              isOpen={openDropdown === 'pageContent'} 
              onToggle={() => handleToggle('pageContent')}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Modals;
