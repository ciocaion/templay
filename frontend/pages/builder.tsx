import React, { useState } from 'react';
import Sidebar from '../components/layout/sidebar';
import TemplateArea from '../components/builder/templatearea';
import { GridLayoutType } from '../components/builder/gridcomponent';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { HStack, VStack } from '@chakra-ui/react';

interface DraggableItem {
  id: string;
  type: string;
  layoutType?: GridLayoutType;
}

function Builder() {
  const [droppedItems, setDroppedItems] = useState<DraggableItem[]>([]);
  const [gridItems, setGridItems] = useState<{ [key: string]: DraggableItem[] }>({
    'droppable-twoColumnEqual-0': [],
    'droppable-twoColumnEqual-1': [],
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  

  const handleDrop = (droppableId: string, draggableId: any, draggableItem: DraggableItem) => {
    // Check if the drop is on a grid
    if (droppableId.startsWith('droppable-')) {
      setGridItems(prev => ({
        ...prev,
        [droppableId]: [...(prev[droppableId] || []), draggableItem]
      }));
    } else {
      // Handle drops on the main template area
      setDroppedItems(prevItems => [
        ...prevItems,
        draggableItem
      ]);
    }
  };
  
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: { clientX: any; clientY: any; }) => {
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleDragEnd = (event: { active: any; over: any; delta: any; }) => {
    const { active, over, delta } = event;
    const { type: itemType, layoutId } = active.data.current;

    // Calculate total drag distance
    const totalDragDistance = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));

    if (totalDragDistance > 10) {
      if (over && over.id.startsWith('droppable-')) {
        const droppableId = over.id;
        const newGridItem = { id: active.id, type: itemType, layoutType: layoutId };

        setGridItems(prev => ({
          ...prev,
          [droppableId]: [...(prev[droppableId] || []), newGridItem]
        }));
      } else if (over && over.id === 'droppable') {
        setDroppedItems(prevItems => [
          ...prevItems,
          { id: active.id, type: itemType, layoutType: layoutId }
        ]);
      }
    }
    setDragStart({ x: 0, y: 0 });
  };

  const handleSaveTemplate = async () => {
    try {
      const templateData = {
        items: droppedItems,
        gridItems: gridItems
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
  
  const handleRetrieveTemplate = async (templateId: string) => {
    try {
      const response = await fetch(`https://templay-backend.vercel.app/api/templates/${templateId}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const template = await response.json();
      console.log('Retrieved template:', template);
  
      // Parse the template_json field to an object
      const parsedTemplate = JSON.parse(template.template_json);
      setDroppedItems(parsedTemplate.items || []);
      setGridItems(parsedTemplate.gridItems || {});
    } catch (error) {
      console.error('Error retrieving template:', error);
    }
  };
  
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <HStack spacing={0} w="100vw" h="100vh" bg="#EBEBEB">
        <Sidebar />
        <VStack w="calc(100% - 360px)" h="100vh" overflow="auto">
          <TemplateArea items={droppedItems} gridItems={gridItems} onDrop={handleDrop} />
        </VStack>
        <button onClick={handleSaveTemplate}>Save Template</button>
        <button onClick={() => handleRetrieveTemplate('123')}>Retrieve Template</button>
      </HStack>
    </DndContext>
  );
}

export default Builder;