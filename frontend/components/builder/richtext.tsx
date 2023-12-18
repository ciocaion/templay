'use client'
import React from 'react';
import { Box, Editable, EditablePreview, EditableInput } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

function RichText() {
    useDraggable({
        id: 'text',
        data: { type: 'TEXT' },
    });
  return (
    <Box w="100%" p="20px" bg="white">
      <Editable defaultValue="Heading" fontSize="24px" mb="12" color="#020281" textTransform='uppercase'>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue="Body text goes here. You can add more content, descriptions, or other information." minH="100%">
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Box>
  );
}

export default RichText;
