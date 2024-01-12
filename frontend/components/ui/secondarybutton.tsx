import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface SecondButtonProps {
  text: string;
  onClick?: () => void;  // Optional onClick handler
  icon?: React.ReactNode; // Optional icon
  style?: React.CSSProperties;
  textColor?: string;
}

function SecondaryButton({ text, onClick, icon, style, textColor  }: SecondButtonProps) {
  return (
    <Box
      onClick={onClick} // Attach the onClick event
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="solid 1px"
      borderColor="#020281"
      width="280px"
      height="48px"
      backgroundColor="#fffff"
      gap="1rem"
      borderRadius="50px"
      padding="0 1rem"
      _hover={{ backgroundColor: "#E6E6F8" }} 
      cursor="pointer"
      style={{ ...style }}
    >
      <Text
       color={textColor || "#020281"}
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

export default SecondaryButton;
