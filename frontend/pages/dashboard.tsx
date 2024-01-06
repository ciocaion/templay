import React, { useState, useEffect } from 'react';
import { HStack, Box, Text, VStack, Flex, IconButton } from '@chakra-ui/react';
import TutorialModal from '../components/layout/tutorialModal';
import IntroModal from '../components/layout/introModal';
import Sidebar from '../components/layout/sidebar';
import { AddIcon } from '@chakra-ui/icons'; // Import the AddIcon from Chakra UI
import Link from 'next/link';

interface DashboardProps {
  isSidebarCollapsed: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isSidebarCollapsed }) => {
  const [isIntroOpen, setIntroOpen] = useState(false);
  const [isTutorialOpen, setTutorialOpen] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setIntroOpen(true);
      localStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);

  const startTutorial = () => {
    setIntroOpen(false);
    setTutorialOpen(true);
  };

  const openTutorial = () => {
    setTutorialOpen(true);
  };

  return (
    <>
      <IntroModal
        isOpen={isIntroOpen}
        onClose={() => setIntroOpen(false)}
        onStartTutorial={startTutorial}
        backgroundImage="/assets/gea-tool.png"
      />
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />
      <HStack spacing={0}>
        <Sidebar onOpenTutorial={openTutorial} isCollapsed={isSidebarCollapsed} />
        <Box flex="1" >
          {/* General Title */}
          <VStack spacing={4} alignItems="center">
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Create your desired page layout
            </Text>
          </VStack>

          {/* Card-Style Box to the Left */}
          <Flex align="center">
          <Link href="/builder"> {/* Use Link component with the href */}
            <Box
            marginLeft='24px'
              p={16}
              boxShadow="lg"
              borderRadius="lg"
              display="flex"
              flexDirection="column"
              alignItems="center"
              cursor="pointer"
            >
              <IconButton
                aria-label="Create New Template"
                icon={<AddIcon />}
                colorScheme="blue"
              />
              <Text>Create New Template</Text>
            </Box>
        </Link>
          </Flex>
        </Box>
      </HStack>
    </>
  );
};

export default Dashboard;
