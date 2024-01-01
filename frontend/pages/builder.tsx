import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/modal';
import TemplateArea from '../components/builder/templatearea';
import { GridLayoutType } from '../components/builder/gridcomponent';
import { Box, HStack, VStack } from '@chakra-ui/react';
import MainButton from '@/components/ui/mainbutton';
import SecondaryButton from '@/components/ui/secondarybutton';

export interface DraggableItem {
  id: string;
  type: string;
  layoutType?: GridLayoutType;
  children: DraggableItems
}

export interface DraggableItems extends Array<DraggableItem>{};

function Builder() {
  const [droppedItems, setDroppedItems] = useState<DraggableItems>([]);
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
      const templateData = {
        items: droppedItems,
      };

      const response = await fetch('https://templay-backend.vercel.app/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(templateData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Save successful:', responseData);
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const handleRetrieveTemplate = async (templateId:string) => {
    try {
      // Fetch the array of templates from the API
      const response = await fetch(`https://templay-backend.vercel.app/api`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Convert the response to JSON, which should be an array
      const templatesArray = await response.json();
  
      // Find the template with the given templateId
      const template = templatesArray.find((t: { template_id: number; }) => t.template_id === parseInt(templateId, 10));
  
      if (!template) {
        throw new Error(`Template with ID ${templateId} not found`);
      }
  
      console.log('Retrieved template:', template);
  
      // Parse the template_json field to an object
      const parsedTemplate = JSON.parse(template.template_json);
      setDroppedItems(parsedTemplate.items || []);
    } catch (error) {
      console.error('Error retrieving template:', error);
    }
  };
  
 return (
    <HStack spacing={0} w="100vw" h="100vh" bg="#EBEBEB">
      <Box padding='16px'>
      <MainButton text="Save Template" onClick={handleSaveTemplate}/>
      <SecondaryButton text="Retrieve Template" onClick={() => handleRetrieveTemplate('15')}/>
      </Box>
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
