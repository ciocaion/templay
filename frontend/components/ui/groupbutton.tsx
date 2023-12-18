'use client'
import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@chakra-ui/react';

function SwitchableComponent() {
    const [active, setActive] = useState('Navigation'); // Default to 'Navigation'
  
    return (
      <Box 
      height="60px" 
      display="flex"
      alignContent="space-around"
      justifyContent="space-around"
      flexWrap="wrap"
      bg="#F5F5F5" 
      p={4}
      >
         <ButtonGroup variant="outline" spacing={20}>
          <Button 
            bg={active === 'Navigation' ? 'white' : '#F5F5F5'}
            border="none"
            p="12px 16px"
            onClick={() => setActive('Navigation')}
          >
            Navigation
          </Button>
          <Button 
            bg={active === 'Elements' ? 'white' : '#F5F5F5'}
            border="none"
            p="12px 16px"
            onClick={() => setActive('Elements')}
          >
            Elements
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
  
  export default SwitchableComponent;
  