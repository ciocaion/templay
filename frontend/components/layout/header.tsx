import React from 'react';
import { Flex, Image, IconButton } from '@chakra-ui/react';
import Link from 'next/link';


function Header() {
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
      <Link href="/dashboard">
          <Image src="/assets/logo.png" alt="Logo" h="16px" ml={2} />
      </Link>
    </Flex>
  );
};

export default Header;
