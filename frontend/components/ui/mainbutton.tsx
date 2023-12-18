'use client'
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

function MainButton(_props: any) {
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
      marginBottom="24px"
      _hover={{ backgroundColor: "#4F4FCD" }}
      cursor="pointer" 
      textDecor="none"
      onClick={_props.onClick}
    >
      <Text
        color="white"
        textAlign="center"
        fontSize="1rem"
        fontWeight="semibold"
      >
        Start creating
      </Text>
      <ArrowForwardOutlinedIcon style={{ color: 'white' }} />
    </Box>
  );
}

export default MainButton;