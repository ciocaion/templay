import React from 'react';
import { Flex, Image, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import HamburgerIcon from '@mui/icons-material/Menu';

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
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        color="white"
        height="32px"
        onClick={onToggleSidebar} // Use onToggleSidebar when menu button is clicked
        variant="ghost"
      />
      <Link href="/dashboard">
          <Image src="/assets/logo.png" alt="Logo" h="16px" ml={2} />
      </Link>
    </Flex>
  );
};

export default Header;
