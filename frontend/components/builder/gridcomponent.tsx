import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import Banner from './banner'; 
import Hero from './hero';  
import PageContent from './pagecontent';
import ImageBlock from './image';

export type GridLayoutType = 'twoColumnEqual' | 'twoColumnWideLeft' | 'twoColumnWideRight' | 'threeColumnEqual' | 'singleColumn' | string;

interface DraggableItem {
  id: string;
  type: string;
  layoutType?: GridLayoutType;
}

interface GridComponentProps {
  layout: GridLayoutType;
  items: { [key: string]: DraggableItem[] };
  onDrop: (droppableId: string, draggableId: string, draggableItem: DraggableItem) => void;
}

const GridComponent: React.FC<GridComponentProps> = ({ layout, items, onDrop }) => {
  // Maintain a state object to store dropped items for each grid type
  const [droppedGrids, setDroppedGrids] = useState<{ [key: string]: string[] }>({});

  // Use useDroppable to make the GridComponent a drop target
  const { setNodeRef: gridRef, isOver } = useDroppable({ id: `grid-${layout}` });

  const renderDroppableGridItem = (key: number) => {
    const droppableId = `droppable-${layout}-${key}`;
    const { setNodeRef, isOver: itemIsOver } = useDroppable({ id: droppableId });

    const droppedItems = items[droppableId] || [];

    return (
      <GridItem ref={setNodeRef} key={key} border="2px dashed #020281" p={40} bg={itemIsOver ? 'lightgray' : 'white'}>
        {droppedItems.map((item) => {
          // Render different components based on item type
          switch (item.type) {
            case 'BANNER':
              return <Banner key={item.id} width="100%" />;
            case 'HERO':
              return <Hero key={item.id} />;
            case 'PAGE':
              return <PageContent key={item.id} />;
            case 'IMAGE':
              return <ImageBlock key={item.id} />;
            default:
              return <div key={item.id}>{item.type}</div>;
          }
        })}
      </GridItem>
    );
  };

  const renderGridItems = () => {
    const numberOfColumns = {
      'twoColumnEqual': 2,
      'twoColumnWideLeft': 2,
      'twoColumnWideRight': 2,
      'threeColumnEqual': 3,
      'singleColumn': 1,
    }[layout] || 1;

    return Array.from({ length: numberOfColumns }, (_, index) => renderDroppableGridItem(index));
  };

  const gridTemplateColumns = {
    'twoColumnEqual': 'repeat(2, 1fr)',
    'twoColumnWideLeft': '2fr 1fr',
    'twoColumnWideRight': '1fr 2fr',
    'threeColumnEqual': 'repeat(3, 1fr)',
    'singleColumn': '1fr',
  }[layout] || '1fr';

  // Clear the dropped items state for the current grid type
  useEffect(() => {
    console.log('layout changed to:', layout);
    if (droppedGrids[layout]) {
      console.log('Clearing dropped items for layout:', layout);
      setDroppedGrids((prevDroppedGrids) => ({ ...prevDroppedGrids, [layout]: [] }));
    }
  }, [layout]);

  console.log('isOver:', isOver);
  console.log('droppedGrids:', droppedGrids);

  return (
    <Box>
      {/* Use gridRef as the ref for the GridComponent */}
      <Grid
        ref={gridRef}
        templateColumns={gridTemplateColumns}
        gap={4}
        margin="32px"
        padding="0px"
        overflow="hidden"
        bg={isOver ? 'lightgray' : 'white'}
      >
        {renderGridItems()}
      </Grid>
    </Box>
  );
};

export default GridComponent;