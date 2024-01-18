import React, { useState } from 'react';
import { Box, Editable, EditablePreview, EditableInput, Flex } from '@chakra-ui/react';

interface CardProps {
  onTextChange: (text: { header: string; subHeader: string; bodyText: string }) => void;
  initialText?: { header: string; subHeader: string; bodyText: string };
  width?: string
}

function PageContent({ onTextChange, initialText, width = '90%' }: CardProps) {
  const [header, setHeader] = useState(initialText?.header || "Header");
  const [subHeader, setSubHeader] = useState(initialText?.subHeader || "Subheader");
  const [bodyText, setBodyText] = useState(initialText?.bodyText || "Here is some body text...");

  const handleCardHeaderChange = (value: string) => {
    setHeader(value);
    onTextChange({ header: value, subHeader, bodyText });
  };
  
  const handleCardSubHeaderChange = (value: string) => {
    setSubHeader(value);
    onTextChange({ header, subHeader: value, bodyText });
  };
  
  const handleCardBodyTextChange = (value: string) => {
    setBodyText(value);
    onTextChange({ header, subHeader, bodyText: value });
  };

  return (
    <Flex justifyContent="center">
    <Box
      w={width}
      h="475px" // Adjusted height to accommodate both image and text
      bg="#020281"
      margin="32px auto"
    >
      <Flex
        flexDirection="column" // Changed to column
        w="100%" 
        h="100%"
      >
        <Box w="100%" h="100%" bgImage="url(./assets/gea-dummy.png)" bgSize="cover" bgPos="center">
        </Box>
        <Box w="100%" p="32px" color="white">
        <Editable value={header} fontSize="2xl" onChange={handleCardHeaderChange}>
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable value={subHeader} fontSize="xl" mt="2" onChange={handleCardSubHeaderChange}>
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable value={bodyText} mt="2" onChange={handleCardBodyTextChange}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Box>
      </Flex>
    </Box>
    </Flex>
  );
}

export default PageContent;
