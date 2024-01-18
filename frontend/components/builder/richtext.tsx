import React, { useState } from 'react';
import { Box, Editable, EditablePreview, EditableInput } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

interface TextProps {
  onTextChange: (text: { header: string; bodyText: string }) => void;
  initialText?: { header: string; bodyText: string };
}

function RichText({ onTextChange, initialText}: TextProps) {
  const [header, setHeader] = useState(initialText?.header || "Header");
  const [bodyText, setBodyText] = useState(initialText?.bodyText || "Here is some body text...");

  const handleTextHeaderChange = (value: string) => {
    setHeader(value);
    onTextChange({ header: value, bodyText });
  };
  
  const handleTextBodyTextChange = (value: string) => {
    setBodyText(value);
    onTextChange({ header,bodyText: value });
  };

    useDraggable({
        id: 'text',
        data: { type: 'TEXT' },
    });
  return (
    <Box w="100%" p="20px" bg="white">
        <Editable value={header} fontSize="2xl" onChange={handleTextHeaderChange}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable value={bodyText} mt="2" onChange={handleTextBodyTextChange}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Box>
  );
}

export default RichText;
