import React, { useEffect, useState } from "react";
import {
  VStack,
  Text,
  HStack,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Banner from "../components/builder/banner";
import Hero from "@/components/builder/hero";
import Sidebar from "../components/layout/sidebar";
import ImageBlock from "@/components/builder/image";
import PageContent from "@/components/builder/pagecontent";
import RichText from "@/components/builder/richtext";
import IntroModal from "@/components/layout/introModal";
import TutorialModal from "@/components/layout/tutorialModal";

interface ComponentProps {
  isSidebarCollapsed: boolean;
}

const Components: React.FC<ComponentProps> = ({ isSidebarCollapsed }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isIntroOpen, setIntroOpen] = useState(false);
  const [isTutorialOpen, setTutorialOpen] = useState(false);

  const components = [
    { name: "Banner", component: <Banner /> },
    { name: "Hero", component: <Hero /> },
    { name: "Image", component: <ImageBlock /> },
    { name: "Card Standard", component: <PageContent /> },
    { name: "Rich Text", component: <RichText /> },
  ];

  const maxIndex = components.length - 1;

  const handlePrev = () => {
    setSliderValue((oldValue) => (oldValue > 0 ? oldValue - 1 : 0));
  };

  const handleNext = () => {
    setSliderValue((oldValue) =>
      oldValue < maxIndex ? oldValue + 1 : maxIndex
    );
  };

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
        />
        <Box flex="1">
          <Text fontSize="24px" fontWeight="bold" textAlign="center">
            Available Components
          </Text>
          <VStack spacing={4}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {components[sliderValue].name}
            </Text>
            <Box width="80%">{components[sliderValue].component}</Box>
            <Flex alignItems="center">
              <Button
                onClick={handlePrev}
                leftIcon={<ChevronLeftIcon />}
                marginEnd={2}
              >
                Prev
              </Button>
              <Slider
                value={sliderValue}
                min={0}
                max={maxIndex}
                onChange={setSliderValue}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Button
                onClick={handleNext}
                rightIcon={<ChevronRightIcon />}
                marginStart={2}
              >
                Next
              </Button>
            </Flex>
          </VStack>
        </Box>
      </HStack>
    </>
  );
};

export default Components;
