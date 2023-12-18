import React from 'react';
import { Box, Flex, Tooltip } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

function ImageBlock() {
    useDraggable({
        id: 'image',
        data: { type: 'IMAGE' },
    });
  return (
    
    <Flex
    flexDirection='column'
    flexWrap='wrap'
    justifyContent='center'
    alignContent='center'
    w="100%" 
    h="50%"
    padding="20px"
  >
    <Tooltip hasArrow label='We recommend using image size of 2400x1350 pixels for horizontal and 560x747 pixel for vertical images. Image files sizes should not be more than 200 KB' color='141414' bg='#D5EDFF' padding='16px'>
    <Box w="50%" h="100%" bgImage="url(./assets/gea-dummy.png)" bgSize="cover" bgPos="center"></Box>
    </Tooltip>
    </Flex>
  );
}

export default ImageBlock;
