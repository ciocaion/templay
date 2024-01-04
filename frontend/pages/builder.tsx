import React, { useState, useEffect } from 'react';
import {
  Box, HStack, VStack, Modal,
  ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton,
  Button, Input, useDisclosure
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
  children: DraggableItems
}

export interface DraggableItems extends Array<DraggableItem> { };

function Builder() {
  const [droppedItems, setDroppedItems] = useState<DraggableItems>([]);
  const [title, setTitle] = useState('');
  const { isOpen: isSaveModalOpen, onOpen: onSaveModalOpen, onClose: onSaveModalClose } = useDisclosure();
  const { isOpen: isRetrieveModalOpen, onOpen: onRetrieveModalOpen, onClose: onRetrieveModalClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    // Define the function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log('main dropped items', droppedItems)
    console.log('RERENDER');
  }, [droppedItems]);

  
  const appendChildren = (id: string, newItems:  DraggableItems,  columnId?:string,)=> {
   setDroppedItems(droppedItems.map(item => {

    if(item.id === id) {
      if (columnId) {
        item.children = item.children.map(columnItem => {
          if(columnItem.id === columnId) {
            columnItem.children = columnItem.children.concat(newItems);
          }
          return columnItem
        });
      }
      else {
        item.children = item.children.concat(newItems);
      }
    }
    return item;
   }))

   console.log(droppedItems);

  }


  // Handle component selection from the modal
  const handleComponentSelection = (componentType: string, layoutType?: GridLayoutType) => {

    console.log(componentType, layoutType);
    const newComponentId = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newComponent = { id: newComponentId, type: componentType, layoutType: layoutType, children: [] };
    setDroppedItems(prevItems => [...prevItems, newComponent]);
    setIsModalOpen(false); // Close the modal after selection
    console.log(droppedItems) 
  };

  
  // Function to handle component deletion
  const handleDelete = (itemId: string) => {
    // Filter out the item with the specified id
    const updatedItems = droppedItems.filter(item => item.id !== itemId);
    // Update the state with the new items array
    setDroppedItems(updatedItems);
  };

  const handleSaveTemplate = async () => {
    try {
      const templateData = droppedItems; // directly use droppedItems
  
      console.log('Sending data:', { items: templateData, title }); // log the data structure
  
      const response = await fetch('http://localhost:4000/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: templateData, title }) // send this structured data
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Save successful:', responseData);
      onSaveModalClose(); // Close the save modal
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const handleRetrieveTemplate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const templates = await response.json();
      console.log('Retrieved templates:', templates);
  
      templates.forEach((template: { template_json: string; }) => {
        const parsedTemplate = JSON.parse(template.template_json);
        if (parsedTemplate.title === title) {
          // Title matches, do something with this template
          setDroppedItems(parsedTemplate.items || []);
          // You may want to break the loop or return after finding the right template
        }
      });
  
      onRetrieveModalClose(); // Close the retrieve modal
  
    } catch (error) {
      console.error('Error retrieving template:', error);
    }
  };
  
  
 return (
    <HStack spacing={0} w="100vw" h="100vh" bg="#EBEBEB">
      <Box padding='16px'>
      <MainButton text="Save Template" onClick={onSaveModalOpen}/>
      <SecondaryButton text="Retrieve Template" onClick={onRetrieveModalOpen} />
      </Box>
         {/* Save Template Modal */}
         <Modal isOpen={isSaveModalOpen} onClose={onSaveModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Template Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveTemplate}>
              Save
            </Button>
            <Button variant="ghost" onClick={onSaveModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Retrieve Template Modal */}
      <Modal isOpen={isRetrieveModalOpen} onClose={onRetrieveModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retrieve Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Template Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleRetrieveTemplate}>
              Retrieve
            </Button>
            <Button variant="ghost" onClick={onRetrieveModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack w="100%" h="100vh" overflow="auto">
      <TemplateArea 
      items={droppedItems} openModal={openModal} 
      appendChildren={appendChildren} 
      onDelete={handleDelete} 
      onComponentAdd={function (type: string, layoutType: string, gridId: string): void {
         throw new Error('Function not implemented.');
       }} />
      </VStack>
      <Sidebar 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      onSelect={handleComponentSelection} // Pass the function here
    />
    </HStack>
  );
}

export default Builder;
