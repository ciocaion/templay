import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface MainButtonProps {
  text: string;
  onClick?: () => void;  // Optional onClick handler
  icon?: React.ReactNode; // Optional icon
}


function MainButton({ text, onClick, icon }: MainButtonProps){
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="280px"
      height="48px"
      backgroundColor="#020281"
      gap="1rem"
      borderRadius="50px"
      padding="0 1rem"
      _hover={{ backgroundColor: "#4F4FCD" }}
      cursor="pointer" 
      textDecor="none"
      onClick={onClick}
    >
      <Text
        color="#ffffff"
        textAlign="center"
        fontSize="1rem" 
        fontWeight="semibold"
      >
        {text}
      </Text>
      {icon && <Box ml="0px" display="flex" alignItems="center">{icon}</Box>}
    </Box>
  );
}

export default MainButton;