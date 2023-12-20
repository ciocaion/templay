import React from 'react';
import { Box, Editable, EditablePreview, EditableInput, Flex } from '@chakra-ui/react';

function Banner({ width = '90%' }) {
  return (
    <Flex justifyContent="center"> 
      <Box 
        w={width}
        h="375px"
        bg="#020281"
        margin="32px auto"
      >
        <Flex w="100%" h="100%">
          <Box w="50%" h="100%" bgImage="url(./assets/gea-dummy.png)" bgSize="cover" bgPos="center">
          </Box>
          <Box w="50%" p="20px" color="white">
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

export default Banner;
