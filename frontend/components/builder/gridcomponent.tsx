import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Button } from '@chakra-ui/react';
import Banner from './banner'; 
import Hero from './hero';  
import Sidebar from '../layout/sidebar';
import {DraggableItem, DraggableItems} from '../../pages/builder';
export type GridLayoutType = 'twoColumnEqual' | 'twoColumnWideLeft' | 'twoColumnWideRight' | 'threeColumnEqual' | 'singleColumn' | string;


interface GridComponentProps {
  id: string;
  layout: GridLayoutType | undefined;
  items: DraggableItems
  appendChildren: (id: string, newItems: DraggableItems, columnId?: string) => void;
  onComponentAdd: (type: string, layoutType: GridLayoutType, gridId: string) => void; // New prop for adding components
}

const GridComponent: React.FC<GridComponentProps> = ({id: gridId, layout, items =[], onComponentAdd, appendChildren }) => {

  console.log('grid_items', items);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const [currentColumn, setCurrentColumn] = useState('');

  useEffect(() => {
    if (!items.length) {
      renderGridItems()
    }
  }, [items])

  const handleComponentSelection = (componentType: string, layoutType?: GridLayoutType) => {

    console.log(componentType, layoutType);
    const newComponentId = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newComponent = { id: newComponentId, type: componentType, layoutType: layoutType, children: [] };

    console.log("new component", newComponent)
    appendChildren(gridId, [newComponent], currentColumn);
    setIsModalOpen(false); // Close the modal after selection
    setCurrentColumn('');
  };



 



  const renderGridItem = (item: DraggableItem) => {
    const {id, children} = item;


    return (
      <GridItem key={id} border="2px dashed #020281" p={40} bg="white">
        {children.map((item) => {
          switch (item.type) {
            case 'BANNER':
              return <Banner key={item.id} />;
            case 'HERO':
              return <Hero key={item.id} />;
            default:
              return <div key={item.id}>{item.type}</div>;
          }
        })}

        <Sidebar 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)}
              
              onSelect={handleComponentSelection} // Pass the function here
              />
        <Button onClick={() => {
          setIsModalOpen(true);
          setCurrentColumn(item.id)
        }}
        >Select components</Button>

      </GridItem>
    );
  };

  const renderGridItems = () => {
    const layoutMapping  = {
      'twoColumnEqual': 2,
      'twoColumnWideLeft': 2,
      'twoColumnWideRight': 2,
      'threeColumnEqual': 3,
      'singleColumn': 1,
    };

    const safeLayout = layout as keyof typeof layoutMapping;


    const numberOfColumns = layoutMapping[safeLayout] ?? 1; // Default to 1 if layout is not found


    const newComponents = [];

    for (let i=0; i < numberOfColumns;i++) {
      newComponents.push({
        id: `${gridId}-column-${i}`,
        type: "undefined",
        children: [],
        layoutType: "undefined",
      });
    }

    appendChildren(gridId, newComponents);

      };

  const gridTemplateColumns = {
    'twoColumnEqual': 'repeat(2, 1fr)',
    'twoColumnWideLeft': '2fr 1fr',
    'twoColumnWideRight': '1fr 2fr',
    'threeColumnEqual': 'repeat(3, 1fr)',
    'singleColumn': '1fr',
  }[layout || 'singleColumn'];

  return (
    <Box>
      <Grid
        templateColumns={gridTemplateColumns}
        gap={4}
        margin="32px"
        padding="0px"
        overflow="hidden"
        bg="white"
      >
        {items.map(item => renderGridItem(item))}
      </Grid>
    </Box>
  );
};

export default GridComponent;
