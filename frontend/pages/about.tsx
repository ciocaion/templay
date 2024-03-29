import React, { useState, useEffect } from 'react';
import { HStack, Box, Text, VStack, Flex, IconButton } from '@chakra-ui/react';
import TutorialModal from '../components/layout/tutorialModal';
import IntroModal from '../components/layout/introModal';
import Sidebar from '../components/layout/sidebar';


interface AboutProps {
  isSidebarCollapsed: boolean;
}

const Dashboard: React.FC<AboutProps> = ({ isSidebarCollapsed }) => {
  const [isTutorialOpen, setTutorialOpen] = useState(false);

  const openTutorial = () => {
    setTutorialOpen(true);
  };

  return (
    <>
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />
      <HStack spacing={0}>
        <Sidebar onOpenTutorial={openTutorial} isCollapsed={isSidebarCollapsed} />
        <Box flex="1" p={16}>
          {/* General Title */}
          <VStack spacing={4} alignItems="center">
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Section coming soon!
            </Text>
          </VStack>
        </Box>
      </HStack>
    </>
  );
};

export default Dashboard;
