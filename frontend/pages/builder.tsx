import React, { useId, useState } from 'react';
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
  const id = useId()

  const [droppedItems, setDroppedItems] = useState<DraggableItem[]>([]);
  const [gridItems, setGridItems] = useState<{ [key: string]: DraggableItem[] }>({
    'droppable-twoColumnEqual-0': [],
    'droppable-twoColumnEqual-1': [],
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDrop = (droppableId: string, draggableId: string, draggableItem: any) => {
    console.log('handleDrop called - droppableId:', droppableId, 'draggableId:', draggableId, 'draggableItem:', draggableItem);

    if (droppableId.startsWith('droppable-')) {
      // Generate a unique ID for each dropped grid
      const newGridId = `grid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Then add the new grid item
      const newGridItem = { ...draggableItem, id: newGridId, contents: [] };
      console.log('Creating a new grid:', droppableId, newGridItem);
      setGridItems(prev => ({
        ...prev,
        [newGridId]: [...(prev[newGridId] || []), newGridItem]
      }));
    } else {
      setDroppedItems(prevItems => [...prevItems, draggableItem]);
    }

    console.log('Updated droppedItems:', droppedItems);
    console.log('Updated gridItems:', gridItems);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: { clientX: any; clientY: any; }) => {
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleDragEnd = (event: { active: any; over: any; delta: any; }) => {
    console.log('handleDragEnd called with:', event);
  
    const { active, over, delta } = event;
    const { type: itemType, layoutId } = active.data.current;
  
    // Calculate total drag distance
    const totalDragDistance = Math.sqrt(delta.x ** 2 + delta.y ** 2);
  
    if (totalDragDistance > 10 && over) {
      if (over.id.startsWith('droppable-')) {
        // Logic for handling drop on a grid item
        const droppableId = over.id;
        const newGridItem = { id: `grid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, type: itemType, layoutType: layoutId };
  
        setGridItems(prev => ({
          ...prev,
          [droppableId]: [...(prev[droppableId] || []), newGridItem]
        }));
      } else if (over.id === 'droppable') {
        // Logic for handling drop on the main droppable area
        const newDroppedItem = { id: active.id, type: itemType, layoutType: layoutId };
  
        setDroppedItems(prevItems => [
          ...prevItems,
          newDroppedItem
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

      const response = await fetch('http://localhost:4000/api/templates', {
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
      const response = await fetch(`http://localhost:4000/api/templates/${templateId}`);

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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} id={id} >
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
