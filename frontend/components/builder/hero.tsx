import React, { useState } from "react";
import {
  Box,
  Editable,
  EditablePreview,
  EditableInput,
  Flex,
} from "@chakra-ui/react";

interface HeroProps {
  onTextChange: (text: {
    header: string;
    subHeader: string;
    bodyText: string;
  }) => void;
  initialText?: { header: string; subHeader: string; bodyText: string };
}

function Hero({ onTextChange, initialText }: HeroProps) {
  const [header, setHeader] = useState(initialText?.header || "Header");
  const [subHeader, setSubHeader] = useState(
    initialText?.subHeader || "Subheader"
  );
  const [bodyText, setBodyText] = useState(
    initialText?.bodyText || "Here is some body text..."
  );

  const handleHeaderChange = (value: string) => {
    setHeader(value);
    onTextChange({ header: value, subHeader, bodyText });
  };

  const handleSubHeaderChange = (value: string) => {
    setSubHeader(value);
    onTextChange({ header, subHeader: value, bodyText });
  };

  const handleBodyTextChange = (value: string) => {
    setBodyText(value);
    onTextChange({ header, subHeader, bodyText: value });
  };

  return (
    <Box w="100%" h="475px" bg="#020281" marginBottom="32px auto">
      <Flex w="100%" h="100%">
        <Box w="50%" p="32px" color="white">
          <Editable value={header} fontSize="2xl" onChange={handleHeaderChange}>
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable
            value={subHeader}
            fontSize="xl"
            mt="2"
            onChange={handleSubHeaderChange}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable value={bodyText} mt="2" onChange={handleBodyTextChange}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Box>
        <Box
          w="50%"
          h="100%"
          bgImage="url(./assets/gea-dummy.png)"
          bgSize="cover"
          bgPos="center"
        ></Box>
      </Flex>
    </Box>
  );
}

export default Hero;
