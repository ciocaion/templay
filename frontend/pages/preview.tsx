import React, { useState, useEffect, useRef } from "react";
import Banner from "../components/builder/banner";
import Hero from "../components/builder/hero";
import GridComponent from "../components/builder/gridcomponent";
import PageContent from "../components/builder/pagecontent";
import RichText from "../components/builder/richtext";
import ImageBlock from "../components/builder/image";
import { useRouter } from "next/router";
import SecondaryButton from "@/components/ui/secondarybutton";
import { Box, HStack, Input, Flex, IconButton, useOutsideClick, Alert, AlertIcon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function PreviewPage() {
  const router = useRouter();
  const { items: itemsJson } = router.query;
  const items = itemsJson
    ? JSON.parse(decodeURIComponent(itemsJson as string))
    : [];
  const [title, setTitle] = useState("");
  const [isTemplateNotFound, setIsTemplateNotFound] = useState(false);
  const {
    isOpen: isRetrieveModalOpen,
    onOpen: onRetrieveModalOpen,
    onClose: onRetrieveModalClose,
  } = useDisclosure();
  const dummyOnChange = () => {}; // Dummy function for onTextChange
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [templateTitles, setTemplateTitles] = useState<string[]>([]);
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTemplateTitles = async () => {
      try {
        const response = await fetch('http://localhost:4000/api');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const templates = await response.json();
  
        // Extract titles from the templates array
        const titles = templates.map((template: { title: any; }) => template.title);
        setTemplateTitles(titles);
        setFilteredTitles(titles);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplateTitles([]);
        setFilteredTitles([]);
      }
    };
  
    fetchTemplateTitles();
  }, []);

  useOutsideClick({
    ref: ref,
    handler: () => setIsDropdownOpen(false),
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTitle(input);
    setIsDropdownOpen(true);
    const filtered = templateTitles.filter(title => title.toLowerCase().includes(input.toLowerCase()));
    setFilteredTitles(filtered);
  };

  const handleTitleSelect = (selectedTitle: string) => {
    setTitle(selectedTitle);
    setIsDropdownOpen(false);
    handleRetrieveTemplate(selectedTitle);
  };  

  const handleRetrieveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleRetrieveTemplate();
  };  

  const handleRetrieveTemplate = async (templateTitle: string = title) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/templates/${templateTitle}`
        );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const template = await response.json();
      if (template.template_json) {
        const parsedTemplateJson = JSON.parse(template.template_json);
        router.push(
          `/preview?items=${encodeURIComponent(
            JSON.stringify(parsedTemplateJson)
          )}`
        );
        setIsTemplateNotFound(false);
      } else {
        setIsTemplateNotFound(true);
      }
    } catch (error) {
      console.error("Error retrieving template:", error);
      setIsTemplateNotFound(true);
    }
    onRetrieveModalClose();
  };

  const renderItem = (item: any, index: any) => {
    const key = item.type === "GRID" ? `GRID-${index}` : item.id;

    switch (item.type) {
      case "BANNER":
        return (
          <Banner
            key={key}
            initialText={item.bannerText}
            onTextChange={dummyOnChange}
          />
        );
      case "HERO":
        return (
          <Hero
            key={key}
            initialText={item.heroText}
            onTextChange={dummyOnChange}
          />
        );
      case "GRID":
        return (
          <GridComponent
            key={`GRID-${index}`}
            id={item.id}
            layout={item.layoutType}
            items={item.children}
            appendChildren={() => {}}
            onComponentAdd={() => {}}
            onHeroTextChange={() => {}}
            onBannerTextChange={() => {}}
          />
        );
      case "PAGE":
        return (
          <PageContent
            key={key}
            initialText={item.cardText}
            onTextChange={dummyOnChange}
          />
        );
      case "TEXT":
        return (
          <RichText
            key={key}
            initialText={item.richText}
            onTextChange={dummyOnChange}
          />
        );
      case "IMAGE":
        return <ImageBlock key={key} />;
      default:
        return null;
    }
  };

  return (
    <Box w="100vw" h="100vh" bg="#EBEBEB">
      <img src="/assets/header.png" alt="Header" />
      {items.length > 0 ? (
        items.map(renderItem)
      ) : (
        <p>No template data available to preview.</p>
      )}
      <img src="/assets/footer.png" alt="Footer" />
      <Modal isOpen={isRetrieveModalOpen} onClose={onRetrieveModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retrieve Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex ref={ref} direction="column" position="relative" width="100%">
            <Flex>
              <Input
                placeholder="Template Title"
                value={title}
                onChange={handleTitleInputChange}
              />
              <IconButton
                aria-label="Open Dropdown"
                marginLeft="12px"
                icon={<ChevronDownIcon />}
                onClick={toggleDropdown}
              />
            </Flex>
            {isDropdownOpen && (
              <Box
                position="absolute"
                marginTop="48px"
                width="100%"
                bg="white"
                maxHeight="250px"
                overflowY="auto"
                border="1px solid"
                borderColor="gray.200"
                zIndex="1"
              >
                {filteredTitles.length > 0 ? (
                  filteredTitles.map(t => (
                    <Box
                      key={t}
                      p={2}
                      borderBottom="1px solid"
                      borderColor="gray.100"
                      _hover={{ bg: "gray.50" }}
                      onClick={() => handleTitleSelect(t)}
                    >
                      {t}
                    </Box>
                  ))
                ) : (
                  <Box p={2}>No Templates Found</Box>
                )}
              </Box>
            )}
          </Flex>
        </ModalBody>
          <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleRetrieveButtonClick}>
            Retrieve
            </Button>
            <Button variant="ghost" onClick={onRetrieveModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isTemplateNotFound && (
        <Alert status="error">
          <AlertIcon />
          Template with this title does not exist!
        </Alert>
      )}

      <HStack spacing={4} justify="center" align="center" marginTop="16px">
        <SecondaryButton
          text="Retrieve Template"
          onClick={onRetrieveModalOpen}
        />
      </HStack>
    </Box>
  );
}

export default PreviewPage;
