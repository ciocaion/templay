import React, { useState } from 'react';
import { Box, Editable, EditablePreview, EditableInput, Flex } from '@chakra-ui/react';

interface BannerProps {
  onTextChange: (text: { header: string; subHeader: string; bodyText: string }) => void;
  initialText?: { header: string; subHeader: string; bodyText: string };
  width?: string
}

function Banner({ onTextChange, initialText, width = '90%' }: BannerProps) {
  const [header, setHeader] = useState(initialText?.header || "Header");
  const [subHeader, setSubHeader] = useState(initialText?.subHeader || "Subheader");
  const [bodyText, setBodyText] = useState(initialText?.bodyText || "Here is some body text...");

  const handleBannerHeaderChange = (value: string) => {
    setHeader(value);
    onTextChange({ header: value, subHeader, bodyText });
  };
  
  const handleBannerSubHeaderChange = (value: string) => {
    setSubHeader(value);
    onTextChange({ header, subHeader: value, bodyText });
  };
  
  const handleBannerBodyTextChange = (value: string) => {
    setBodyText(value);
    onTextChange({ header, subHeader, bodyText: value });
  };
  
  return (
    <Flex justifyContent="center"> 
      <Box 
        w={width}
        h="475px"
        bg="#020281"
        margin="32px auto"
      >
        <Flex w="100%" h="100%">
          <Box w="50%" h="100%" bgImage="url(./assets/gea-dummy.png)" bgSize="cover" bgPos="center">
          </Box>
          <Box w="50%" p="32px" color="white">
          <Editable value={header} fontSize="2xl" onChange={handleBannerHeaderChange}>
           <EditablePreview />
             <EditableInput />
          </Editable>
          <Editable value={subHeader} fontSize="xl" mt="2" onChange={handleBannerSubHeaderChange}>
           <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable value={bodyText} mt="2" onChange={handleBannerBodyTextChange}>
  <EditablePreview />
  <EditableInput />
          </Editable>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Banner;
