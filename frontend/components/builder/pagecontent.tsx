import React from 'react';
import { Box, Editable, EditablePreview, EditableInput, Flex } from '@chakra-ui/react';

function PageContent({ width = '90%' }) {

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
          <Editable defaultValue="Header" fontSize="2xl">
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable defaultValue="Subheader" fontSize="xl" mt="2">
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable defaultValue="Here is some body text. This section can contain additional information, descriptions, or other content." mt="2">
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
