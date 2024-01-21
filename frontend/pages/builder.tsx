import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Alert,
  AlertIcon,
  Flex,
  IconButton,
  useOutsideClick,
} from "@chakra-ui/react";
import Sidebar from "../components/layout/sidebar";
import TemplateArea from "../components/builder/templatearea";
import { GridLayoutType } from "../components/builder/gridcomponent";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Modals from "../components/layout/modal";

export interface DraggableItem {
  id: string;
  type: string;
  layoutType?: GridLayoutType;
  children: DraggableItems;
  heroText?: { header: string; subHeader: string; bodyText: string }; // Add heroText property
  bannerText?: { header: string; subHeader: string; bodyText: string };
  cardText?: { header: string; subHeader: string; bodyText: string };
  richText?: { header: string; bodyText: string };
}
export interface DraggableItems extends Array<DraggableItem> {}

interface AltItem {
  title: string;
  text: string;
}

interface MetadataInfo {
  seo: string;
  alt: AltItem[];
}

function Builder() {
  const [droppedItems, setDroppedItems] = useState<DraggableItems>([]);
  const [title, setTitle] = useState("");
  const [isDuplicateTitle, setIsDuplicateTitle] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [isRetrieveSuccess, setIsRetrieveSuccess] = useState(false);
  const {
    isOpen: isSaveModalOpen,
    onOpen: onSaveModalOpen,
    onClose: onSaveModalClose,
  } = useDisclosure();
  const {
    isOpen: isRetrieveModalOpen,
    onOpen: onRetrieveModalOpen,
    onClose: onRetrieveModalClose,
  } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isTemplateNotFound, setIsTemplateNotFound] = useState(false);
  const [isTemplateSaved, setIsTemplateSaved] = useState(false);
  const [isTemplateUnsavedAlertVisible, setIsTemplateUnsavedAlertVisible] =
    useState(false);
  const [seoText, setSeoText] = useState("");
  const [imageAltData, setImageAltData] = useState([{ title: "", text: "" }]);
  const [metadataInfo, setMetadataInfo] = useState<MetadataInfo>({
    seo: "",
    alt: [],
  });
  const router = useRouter();
  const [templateTitles, setTemplateTitles] = useState<string[]>([]);
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isSeoValid, setIsSeoValid] = useState(true);
  const [isItemsValid, setIsItemsValid] = useState<null | boolean>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: ref,
    handler: () => setIsDropdownOpen(false),
  });

  const handleHeroTextChange = (heroText: any, itemId: string) => {
    // Update the state of a specific Hero component in droppedItems
    setDroppedItems(
      droppedItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, heroText };
        }
        return item;
      })
    );
  };

  const handleBannerTextChange = (bannerText: any, itemId: string) => {
    setDroppedItems(
      droppedItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, bannerText: { ...bannerText } };
        }
        return item;
      })
    );
  };

  const handleCardTextChange = (cardText: any, itemId: string) => {
    // Update the state of a specific Hero component in droppedItems
    setDroppedItems(
      droppedItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, cardText };
        }
        return item;
      })
    );
  };

  const handleRichTextChange = (richText: any, itemId: string) => {
    // Update the state of a specific Hero component in droppedItems
    setDroppedItems(
      droppedItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, richText };
        }
        return item;
      })
    );
  };

  const handleGridTextChange = (updatedGrid: any) => {
    setDroppedItems(
      droppedItems.map((item) => {
        if (item.id === updatedGrid.id) {
          return updatedGrid;
        }
        return item;
      })
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log("main dropped items", droppedItems);
    console.log("RERENDER");
  }, [droppedItems]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isDuplicateTitle) {
      timer = setTimeout(() => {
        setIsDuplicateTitle(false);
      }, 5000);
    }
    return () => clearTimeout(timer); // Clear the timer when the component unmounts or the state changes
  }, [isDuplicateTitle]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isRetrieveSuccess) {
      timer = setTimeout(() => {
        setIsRetrieveSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isRetrieveSuccess]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isTemplateNotFound) {
      timer = setTimeout(() => {
        setIsTemplateNotFound(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isTemplateNotFound]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isItemsValid === false) {
      timer = setTimeout(() => {
        setIsItemsValid(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isItemsValid]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isDeleteSuccess) {
      timer = setTimeout(() => {
        setIsDeleteSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isDeleteSuccess]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isSaveSuccess) {
      timer = setTimeout(() => {
        setIsSaveSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSaveSuccess]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isTemplateUnsavedAlertVisible) {
      timer = setTimeout(() => {
        setIsTemplateUnsavedAlertVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isTemplateUnsavedAlertVisible]);

  useEffect(() => {
    const fetchTemplateTitles = async () => {
      try {
        const response = await fetch("http://localhost:4000/api");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const templates = await response.json();

        // Extract titles from the templates array
        const titles = templates.map(
          (template: { title: any }) => template.title
        );
        setTemplateTitles(titles);
        setFilteredTitles(titles);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setTemplateTitles([]);
        setFilteredTitles([]);
      }
    };

    fetchTemplateTitles();
  }, []);

  const appendChildren = (
    id: string,
    newItems: DraggableItems,
    columnId?: string
  ) => {
    setDroppedItems(
      droppedItems.map((item) => {
        if (item.id === id) {
          if (columnId) {
            return {
              ...item,
              children: item.children.map((columnItem) => {
                if (columnItem.id === columnId) {
                  return {
                    ...columnItem,
                    children: [...columnItem.children, ...newItems],
                  };
                }
                return columnItem;
              }),
            };
          } else {
            return {
              ...item,
              children: [...item.children, ...newItems],
            };
          }
        }
        return item;
      })
    );
  };

  const handleComponentSelection = (
    componentType: string,
    layoutType?: GridLayoutType
  ) => {
    const newComponentId = `component-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const newComponent: DraggableItem = {
      id: newComponentId,
      type: componentType,
      layoutType: layoutType,
      children: [],
      heroText: { header: "", subHeader: "", bodyText: "" },
      bannerText: { header: "", subHeader: "", bodyText: "" },
    };
    setDroppedItems((prevItems) => [...prevItems, newComponent]);
    setIsModalOpen(false);
    setIsTemplateSaved(false);
  };

  const handleDelete = (itemId: string) => {
    const updatedItems = droppedItems.filter((item) => item.id !== itemId);
    setDroppedItems(updatedItems);
  };

  const handleSaveTemplate = async () => {
    // Check if SEO text is empty
    if (!seoText.trim()) {
      setIsSeoValid(false);
      return;
    }
    // Validate title
    if (!title.trim()) {
      setIsTitleValid(false);
      return;
    }
    setIsTitleValid(true);

    // Validate items
    if (droppedItems.length === 0) {
      setIsItemsValid(false); // Set to false here if validation fails
      return;
    }
    setIsItemsValid(true);

    try {
      const seoValue = seoText || "";
      const altValues = imageAltData;
      const response = await fetch("http://localhost:4000/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: droppedItems,
          title,
          seo: seoValue,
          alt: altValues,
        }),
      });
      if (response.status === 409) {
        // If status is 409, it means a duplicate title exists
        setIsDuplicateTitle(true);
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Save successful:", responseData);
      setIsSaveSuccess(true);
      setIsTemplateSaved(true);
      onSaveModalClose();
      setMetadataInfo({
        seo: seoValue,
        alt: altValues as AltItem[], // Cast to the correct type if necessary
      });
    } catch (error) {
      console.error("Error saving template:", error);
      setIsSaveSuccess(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (e.target.value.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
    setTitle(input);
    // Ensure that templateTitles elements are strings
    const filtered = templateTitles.filter((title) =>
      title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredTitles(filtered);
  };

  // Specify the type of 'selectedTitle'
  const handleTitleSelect = (selectedTitle: string) => {
    setTitle(selectedTitle);
    // Retrieve template with the selected title
    handleRetrieveTemplate(selectedTitle);
  };

  const handleRetrieveButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Prevent default behavior if needed
    handleRetrieveTemplate(title);
  };

  const handleRetrieveTemplate = async (templateTitle: string = title) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/templates/${templateTitle}`
      );
      if (!response.ok) {
        throw Error("Network response was not ok");
      }
      const template = await response.json();

      // Check if template_json exists and is a string
      if (
        template.template_json &&
        typeof template.template_json === "string"
      ) {
        // Parse the JSON string to an object/array
        const parsedTemplateJson = JSON.parse(template.template_json || "[]");

        // Assuming parsedTemplateJson is an array of items
        setDroppedItems(parsedTemplateJson);
        setIsRetrieveSuccess(true); // Set success state to true
        setIsTemplateNotFound(false);
        setMetadataInfo({
          seo: template.seo || "",
          alt: template.alt ? (JSON.parse(template.alt) as AltItem[]) : [],
        });
      } else {
        console.log("Template not found or invalid format");
        setIsRetrieveSuccess(false); // Optionally, set to false if there's an error
        setIsTemplateNotFound(true);
      }
      onRetrieveModalClose();
    } catch (error) {
      console.error("Error retrieving template:", error);
      setIsTemplateNotFound(true);
      setIsRetrieveSuccess(false); // Optionally, set to false if there's an error
    }
  };
  const customOnSaveModalClose = () => {
    setIsDuplicateTitle(false); // Reset the duplicate title flag
    onSaveModalClose(); // Call the original onClose function from useDisclosure
  };
  const customOnRetrieveModalClose = () => {
    setIsDuplicateTitle(false); // Reset the duplicate title flag
    onRetrieveModalClose(); // Call the original onClose function from useDisclosure
  };

  const handleDeleteTemplate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/templates/${title}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Delete successful");
      setIsDeleteSuccess(true); // Set success state to true
      // Reset the title or any other state if necessary
    } catch (error) {
      console.error("Error deleting template:", error);
      // Handle error state here
    }
  };

  // Function to check if the template title exists in the database
  const isTemplateInDatabase = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/templates/${title}`
      );
      return response.ok; // If the template exists, response.ok will be true
    } catch (error) {
      console.error("Error checking template:", error);
      return false;
    }
  };

  const handlePreview = async () => {
    const templateExists = await isTemplateInDatabase();

    if (!isTemplateSaved && !templateExists) {
      setIsTemplateUnsavedAlertVisible(true); // Show alert for unsaved template
      return;
    }
    // Serialize the items array to a JSON string
    const itemsJson = JSON.stringify(droppedItems);
    router.push(`/preview?items=${encodeURIComponent(itemsJson)}`);
    setIsTemplateUnsavedAlertVisible(false);
  };

  // Functions to pass as props to the Sidebar
  const onOpenTutorial = () => {
    // Implement the logic for opening the tutorial
  };

  const onSave = () => {
    onSaveModalOpen(); // This might open the save modal
  };

  const onRetrieve = () => {
    onRetrieveModalOpen(); // This might open the retrieve modal
  };

  const onDelete = () => {
    handleDeleteTemplate(); // Logic to delete a template
  };

  const onPreview = () => {
    handlePreview(); // Logic to preview a template
  };

  const handleImageTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    setImageAltData((prevData) => {
      const newData = [...prevData];
      newData[index].title = newValue;
      return newData;
    });
  };

  const handleAltTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    setImageAltData((prevData) => {
      const newData = [...prevData];
      newData[index].text = newValue;
      return newData;
    });
  };

  const addImageAltField = () => {
    setImageAltData((prevData) => [...prevData, { title: "", text: "" }]);
  };

  const handleNextClick = () => {
    if (!seoText.trim()) {
      setIsSeoValid(false);
      return; // Prevent going to the next step
    }
    setModalStep(2);
  };

  return (
    <Flex w="100vw" h="100vh" bg="#EBEBEB">
      <Sidebar
        onOpenTutorial={onOpenTutorial}
        onSave={onSave}
        onRetrieve={onRetrieve}
        onDelete={onDelete}
        onPreview={onPreview}
        isBuilderPage={true}
        isCollapsed={false}
        isPreviewPage={false}
      />
      <Box flex="1" overflowY="auto">
        <VStack spacing={0} h="100%" position="relative">
          <TemplateArea
            items={droppedItems}
            openModal={openModal}
            appendChildren={appendChildren}
            onDelete={handleDelete}
            onHeroTextChange={handleHeroTextChange} // Ensure this is passed to TemplateArea
            onBannerTextChange={handleBannerTextChange}
            onCardTextChange={handleCardTextChange}
            onRichTextChange={handleRichTextChange}
            onGridTextChange={handleGridTextChange}
            onComponentAdd={(type, layoutType, gridId) => {}}
          />
          <Modals
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelect={handleComponentSelection}
          />
        </VStack>

        <Modal isOpen={isSaveModalOpen} onClose={customOnSaveModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Save Template</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalStep === 1 && (
                <>
                  <Input
                    placeholder="SEO Text"
                    value={seoText}
                    onChange={(e) => setSeoText(e.target.value)}
                    isInvalid={!isSeoValid}
                  />

                  {!isSeoValid && (
                    <p style={{ color: "red", marginTop:'8px'}}>
                      SEO is required.
                    </p>
                  )}
                  {imageAltData.map((item, index) => (
                    <div key={index}>
                      <Input
                        placeholder={`Image Title ${index + 1}`}
                        value={item.title}
                        onChange={(e) => handleImageTitleChange(e, index)}
                        mt={4}
                        mb={4}
                      />
                      <Input
                        placeholder={`ALT Text ${index + 1}`}
                        value={item.text}
                        onChange={(e) => handleAltTextChange(e, index)}
                        mb={4}
                      />
                    </div>
                  ))}
                  <Button colorScheme="blue" onClick={addImageAltField}>
                    Add Image Title and ALT
                  </Button>
                </>
              )}

              {modalStep === 2 && (
                <>
                  <Input
                    placeholder="Template Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setIsTitleValid(true);
                    }}
                    isInvalid={!isTitleValid}
                  />
                  {!isTitleValid && <p style={{ color: "red", marginTop:'8px'}}>Template title is required.</p>}
                  <ol style={{ paddingLeft: "20px", marginTop: "16px" }}>
                    <li style={{ marginBottom: "16px" }}>
                      We recommend having the next title style:
                      <p>
                        <b>"your-page-name.gea.com-"</b>
                      </p>
                    </li>
                    <li style={{ marginBottom: "16px" }}>
                      After hyphen we should put the number of draft iteration,
                      example:
                      <p>
                        <b>"-1" or "-2"</b>
                      </p>
                    </li>
                    <li style={{ marginBottom: "16px" }}>
                      Final title should be:
                      <p>
                        <b>"your-page-name.gea.com-1"</b>
                      </p>
                    </li>
                  </ol>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              {modalStep === 1 && (
                <Button colorScheme="blue" onClick={handleNextClick}>
                  Next
                </Button>
              )}
              {modalStep === 2 && (
                <>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={handleSaveTemplate}
                  >
                    Save
                  </Button>
                  <Button variant="ghost" onClick={onSaveModalClose}>
                    Cancel
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isRetrieveModalOpen}
          onClose={customOnRetrieveModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Retrieve Template</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                ref={ref}
                direction="column"
                position="relative"
                width="100%"
              >
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
                      filteredTitles.map((t) => (
                        <Box
                          key={t}
                          p={2}
                          borderBottom="1px solid"
                          borderColor="gray.100"
                          _hover={{ bg: "gray.50" }}
                          onClick={() => {
                            handleTitleSelect(t);
                            setIsDropdownOpen(false);
                          }}
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
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleRetrieveButtonClick}
              >
                Retrieve
              </Button>
              <Button variant="ghost" onClick={onRetrieveModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {isDuplicateTitle && (
          <Alert
            status="error"
            position="fixed"
            bottom="10px"
            width="480px"
            zIndex="1100"
            marginLeft="24px"
          >
            <AlertIcon />A template with this title already exists. Please use a
            different title.
          </Alert>
        )}

        {isSaveSuccess && (
          <Alert
            status="success"
            position="fixed"
            bottom="10px"
            width="480px"
            zIndex="1100"
            marginLeft="24px"
          >
            <AlertIcon />
            Template saved successfully
          </Alert>
        )}

        {isRetrieveSuccess && (
          <Alert
            status="success"
            position="fixed"
            bottom="10px"
            width="480px"
            zIndex="1100"
            marginLeft="24px"
          >
            <AlertIcon />
            Template successfully retrieved
          </Alert>
        )}

        {isTemplateNotFound && (
          <Alert
            status="error"
            position="fixed"
            bottom="10px"
            width="480px"
            zIndex="1100"
            marginLeft="24px"
          >
            <AlertIcon />
            Template with this title does not exist!
          </Alert>
        )}

        {isDeleteSuccess && (
          <Alert
            status="success"
            position="fixed"
            bottom="10px"
            width="480px"
            zIndex="1100"
            marginLeft="24px"
          >
            <AlertIcon />
            Template deleted successfully!
          </Alert>
        )}

        {isItemsValid === false && (
          <Alert
            status="error"
            position="fixed"
            bottom="10px"
            width="480px"
            zIndex="1100"
            marginLeft="24px"
          >
            <AlertIcon />
            Please create a template before saving, it is not possible to save
            an empty template!
          </Alert>
        )}

        {isTemplateUnsavedAlertVisible && (
          <Alert
            status="error"
            position="fixed"
            bottom="10px"
            width="480px"
            zIndex="1100"
            marginLeft="24px"
          >
            <AlertIcon />
            Save the template before previewing.
          </Alert>
        )}
      </Box>
    </Flex>
  );
}

export default Builder;
