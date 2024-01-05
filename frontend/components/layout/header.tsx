import React from 'react';
import { Flex, Image, IconButton } from '@chakra-ui/react';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar: () => void; // Added prop for toggling sidebar
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const bgColor = '#000F41';

  return (
    <Flex
      as="header"
      w="100%"
      h="48px"
      bgColor={bgColor}
      align="center"
      px={4}
      color="white"
    >
      <Image
        src="/assets/icons/burger.svg"
        alt="Menu Icon"
        w="24px" 
        h="24px" 
        marginRight="16px"
        onClick={onToggleSidebar} 
        cursor="pointer" 
      />
      <Link href="/dashboard">
          <Image src="/assets/logo.png" alt="Logo" h="16px" ml={2} />
      </Link>
    </Flex>
  );
};

export default Header;
