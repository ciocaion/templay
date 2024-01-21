import React, { useState, useEffect } from "react";
import { HStack, Box, Text, VStack, Flex, IconButton } from "@chakra-ui/react";
import TutorialModal from "../components/layout/tutorialModal";
import IntroModal from "../components/layout/introModal";
import Sidebar from "../components/layout/sidebar";
import { AddIcon, ViewIcon } from "@chakra-ui/icons"; // Import the AddIcon from Chakra UI
import Link from "next/link";

interface DashboardProps {
  isSidebarCollapsed: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isSidebarCollapsed }) => {
  const [isIntroOpen, setIntroOpen] = useState(false);
  const [isTutorialOpen, setTutorialOpen] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setIntroOpen(true);
      localStorage.setItem("hasSeenIntro", "true");
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
        <Sidebar
          onOpenTutorial={openTutorial}
          isCollapsed={isSidebarCollapsed}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
          onRetrieve={function (): void {
            throw new Error("Function not implemented.");
          }}
          onDelete={function (): void {
            throw new Error("Function not implemented.");
          }}
          onPreview={function (): void {
            throw new Error("Function not implemented.");
          }}
          isBuilderPage={false}
          isPreviewPage={false}
        />
        <Box flex="1">
          {/* General Title */}
          <VStack spacing={4} alignItems="left">
            <Text
              fontSize="38px"
              fontWeight="bold"
              textAlign="left"
              marginBottom="48px"
              marginTop="-140px"
              marginLeft="24px"
            >
              Create your desired page layout
            </Text>
          </VStack>

          {/* Card-Style Box to the Left */}
          <Flex align="center" justify="flex-start">
            {/* Create New Template Box */}
            <Link href="/builder">
              {" "}
              {/* Separate Link for the first box */}
              <Box
                p={16}
                backgroundColor="#020281"
                color="white"
                marginLeft="24px"
                boxShadow="xl"
                borderRadius="lg"
                display="flex"
                flexDirection="column"
                alignItems="center"
                cursor="pointer"
                _hover={{
                  background: "#000F41",
                  transition: "0.3s",
                  transitionTimingFunction: "ease",
                }}
              >
                <IconButton
                  aria-label="Create New Template"
                  icon={<AddIcon />}
                  colorScheme="blue"
                  marginBottom="24px"
                />
                <Text>Create New Template</Text>
              </Box>
            </Link>

            {/* Preview Templates Box */}
            <Link href="/preview">
              {" "}
              {/* Separate Link for the second box, adjust href accordingly */}
              <Box
                p={16}
                marginLeft="44px"
                boxShadow="xl"
                borderRadius="lg"
                border="2px solid #020281"
                display="flex"
                flexDirection="column"
                alignItems="center"
                cursor="pointer"
                _hover={{
                  background: "#E6E6F8",
                  transition: "0.3s",
                  transitionTimingFunction: "ease",
                }}
              >
                <IconButton
                  aria-label="Preview Templates"
                  icon={<ViewIcon />}
                  colorScheme="blue"
                  marginBottom="24px"
                />
                <Text>Preview Desired Templates</Text>
              </Box>
            </Link>
          </Flex>
        </Box>
      </HStack>
    </>
  );
};

export default Dashboard;
