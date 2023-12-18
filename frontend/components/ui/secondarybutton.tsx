'use client'
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function MainButton(_props: any) {
  return (
    <Box
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
    >
      <Text
        color="#020281"
        textAlign="center"
        fontSize="1rem" 
        fontWeight="semibold"
      >
        View your templates
      </Text>
      <VisibilityOutlinedIcon style={{ color: '#020281' }} />
    </Box>
  );
}

export default MainButton;
