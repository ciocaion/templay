import React from "react";
import { Button } from "@chakra-ui/react";

interface IconButtonExampleProps {
  icon: React.ReactElement;
  text: string;
  type: "BANNER" | "HERO" | "GRID" | "PAGE" | "TEXT" | "IMAGE";
  layoutId?: string;
  onClick: () => void; // Add onClick prop
}

function ButtonIcon({
  icon,
  text,
  type,
  layoutId,
  onClick,
}: IconButtonExampleProps) {
  return (
    <Button
      leftIcon={icon}
      bg="#F5F5F5"
      color="#8C8C8C"
      marginBottom="8px"
      borderStyle="none"
      padding="8px"
      onClick={onClick} // Use the onClick prop here
    >
      {text}
    </Button>
  );
}

export default ButtonIcon;
