import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Tooltip,
} from "@chakra-ui/react";

interface CustomDropdownProps {
  buttonLabel: string; // Label for the AccordionButton
  menuItems: React.ReactNode[]; // Array of items to be displayed in AccordionPanel
  isOpen: boolean; // New prop to control the open state
  onToggle: () => void;
}

function CustomDropdown({
  buttonLabel,
  menuItems,
  isOpen,
  onToggle,
}: CustomDropdownProps) {
  return (
    <Accordion allowToggle index={isOpen ? 0 : -1} onChange={onToggle}>
      <AccordionItem border="none">
        <h2>
          <Tooltip
            hasArrow
            label="Click to open"
            color="141414"
            bg="#D5EDFF"
            padding="16px"
          >
            <AccordionButton
              background="none"
              color="#8C8C8C"
              borderStyle="none"
              borderBottom="2px solid #F0F0F0"
              _expanded={{ borderBottom: "2px solid #020281" }} // Optional: Style for when the accordion is expanded
            >
              <Box as="span" flex="1" textAlign="left" marginBottom="8px">
                {buttonLabel}
              </Box>
            </AccordionButton>
          </Tooltip>
        </h2>
        <AccordionPanel pb={4}>
          {menuItems.map((item, index) => (
            <Box as="div" background="none" border="none" key={index}>
              {item}
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default CustomDropdown;
