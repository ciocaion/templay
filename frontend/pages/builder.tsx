import React, { useState, useEffect } from 'react';
import {
  Box, HStack, VStack, Modal,
  ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton,
  Button, Input, useDisclosure, Alert, AlertIcon
} from '@chakra-ui/react';
import Sidebar from '../components/layout/modal';
import TemplateArea from '../components/builder/templatearea';
import { GridLayoutType } from '../components/builder/gridcomponent';
import MainButton from '@/components/ui/mainbutton';
import SecondaryButton from '@/components/ui/secondarybutton';

export interface DraggableItem {
  id: string;
  type: string;
  layoutType?: GridLayoutType;
  children: DraggableItems;
}

export interface DraggableItems extends Array<DraggableItem> { };

function Builder() {
  const [droppedItems, setDroppedItems] = useState<DraggableItems>([]);
  const [title, setTitle] = useState('');
  const [isDuplicateTitle, setIsDuplicateTitle] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [isRetrieveSuccess, setIsRetrieveSuccess] = useState(false);
  const { isOpen: isSaveModalOpen, onOpen: onSaveModalOpen, onClose: onSaveModalClose } = useDisclosure();
  const { isOpen: isRetrieveModalOpen, onOpen: onRetrieveModalOpen, onClose: onRetrieveModalClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log('main dropped items', droppedItems)
    console.log('RERENDER');
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
    if (isDeleteSuccess) {
      timer = setTimeout(() => {
        setIsDeleteSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isDeleteSuccess]);
  
  

  const appendChildren = (id: string, newItems: DraggableItems, columnId?: string) => {
    setDroppedItems(droppedItems.map(item => {
      if (item.id === id) {
        if (columnId) {
          item.children = item.children.map(columnItem => {
            if (columnItem.id === columnId) {
              columnItem.children = columnItem.children.concat(newItems);
            }
            return columnItem;
          });
        }
        else {
          item.children = item.children.concat(newItems);
        }
      }
      return item;
    }));
    console.log(droppedItems);
  }

  const handleComponentSelection = (componentType: string, layoutType?: GridLayoutType) => {
    const newComponentId = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newComponent = { id: newComponentId, type: componentType, layoutType: layoutType, children: [] };
    setDroppedItems(prevItems => [...prevItems, newComponent]);
    setIsModalOpen(false);
  };

  const handleDelete = (itemId: string) => {
    const updatedItems = droppedItems.filter(item => item.id !== itemId);
    setDroppedItems(updatedItems);
  };


  const handleSaveTemplate = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: droppedItems, title })
      });
  
      if (response.status === 409) {
        // If status is 409, it means a duplicate title exists
        setIsDuplicateTitle(true);
        return;
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Save successful:', responseData);
      setIsSaveSuccess(true);
      onSaveModalClose();
    } catch (error) {
      console.error('Error saving template:', error);
      setIsSaveSuccess(false);
    }
  };
  

  const handleRetrieveTemplate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/templates/${title}`);
      if (!response.ok) {
        throw Error('Network response was not ok');
      }
      const template = await response.json();
  
      // Check if template_json exists and is a string
      if (template.template_json && typeof template.template_json === 'string') {
        // Parse the JSON string to an object/array
        const parsedTemplateJson = JSON.parse(template.template_json);
  
        // Assuming parsedTemplateJson is an array of items
        setDroppedItems(parsedTemplateJson);
        setIsRetrieveSuccess(true); // Set success state to true
      } else {
        console.log('Template not found or invalid format');
        setIsRetrieveSuccess(false); // Optionally, set to false if there's an error
      }
      onRetrieveModalClose();
    } catch (error) {
      console.error('Error retrieving template:', error);
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
      const response = await fetch(`http://localhost:4000/api/templates/${title}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Delete successful');
      setIsDeleteSuccess(true); // Set success state to true
      // Reset the title or any other state if necessary
    } catch (error) {
      console.error('Error deleting template:', error);
      // Handle error state here
    }
  };
  

  return (
    <Box w="100vw" h="100vh" bg="#EBEBEB">
      <VStack spacing={0} h="100%" position="relative">
        <TemplateArea
          items={droppedItems}
          openModal={openModal}
          appendChildren={appendChildren}
          onDelete={handleDelete}
          onComponentAdd={(type, layoutType, gridId) => {}}
        />
        <Sidebar
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
            <Input placeholder="Template Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveTemplate}>Save</Button>
            <Button variant="ghost" onClick={onSaveModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isRetrieveModalOpen} onClose={customOnRetrieveModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retrieve Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input 
  placeholder="Template Title" 
  value={title} 
  onChange={(e) => {
    setTitle(e.target.value);
    setIsDuplicateTitle(false); // Reset duplicate title flag
  }} 
/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleRetrieveTemplate}>Retrieve</Button>
            <Button variant="ghost" onClick={onRetrieveModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert for Duplicate Title */}
{isDuplicateTitle && (
  <Alert status="error">
    <AlertIcon />
    A template with this title already exists. Please use a different title.
  </Alert>
)}


      {/* Success Alert for Save Template */}
      {isSaveSuccess && (
        <Alert status="success">
          <AlertIcon />
          Template saved successfully
        </Alert>
      )}

      {/* Success Alert for Retrieve Template */}
      {isRetrieveSuccess && (
        <Alert status="success">
          <AlertIcon />
          Template successfully retrieved
        </Alert>
      )}

{isDeleteSuccess && (
  <Alert status="success">
    <AlertIcon />
    Template deleted successfully!
  </Alert>
)}


      <HStack spacing={4} justify="center" align="center" marginTop="16px">
        <MainButton text="Save Template" onClick={onSaveModalOpen} />
        <SecondaryButton text="Retrieve Template" onClick={onRetrieveModalOpen} />
        <SecondaryButton text="Delete Template" onClick={handleDeleteTemplate} style={{ borderColor: "#ff0000" }} textColor="#ff0000" 
 />
      </HStack>
    </Box>
  );
}

export default Builder;