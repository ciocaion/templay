import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Button } from '@chakra-ui/react';
import Banner from './banner'; 
import Hero from './hero';  
import PageContent from './pagecontent';
import GridModal from '../layout/modalGrid'; // Import the new modal component
import { DraggableItem, DraggableItems } from '../../pages/builder';


export type GridLayoutType = 'twoColumnEqual' | 'twoColumnWideLeft' | 'twoColumnWideRight' | 'threeColumnEqual' | 'singleColumn' | string;

interface GridComponentProps {
  id: string;
  layout: GridLayoutType | undefined;
  items: DraggableItems;
  appendChildren: (id: string, newItems: DraggableItems, columnId?: string) => void;
  onComponentAdd: (type: string, layoutType: GridLayoutType, gridId: string) => void;
  onHeroTextChange: (heroText: { header: string; subHeader: string; bodyText: string }, itemId: string) => void; 
  onBannerTextChange: (bannerText: { header: string; subHeader: string; bodyText: string }, itemId: string) => void; 
}

const GridComponent: React.FC<GridComponentProps> = ({ id: gridId, layout, items = [], appendChildren, onBannerTextChange, onHeroTextChange}) => {
  // Existing state and hooks
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [currentColumn, setCurrentColumn] = useState('');
  // New state for the new modal
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
   // State to track if a component has been added to each grid item
   const [componentAdded, setComponentAdded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!items.length) {
      renderGridItems();
    }
  }, [items]);

  
  const handleComponentSelection = (componentType: string, layoutType?: GridLayoutType) => {

    console.log(componentType, layoutType);
    const newComponentId = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newComponent = { id: newComponentId, type: componentType, layoutType: layoutType, children: [] };
     // Update the state to indicate that a component has been added
     setComponentAdded(prev => ({ ...prev, [currentColumn]: true }));

    console.log("new component", newComponent)
    appendChildren(gridId, [newComponent], currentColumn);
    setIsModalOpen(false); // Close the modal after selection
    setIsNewModalOpen(false);
    setCurrentColumn('');
  };
  


  const renderGridItem = (item: DraggableItem) => {
    const {id, children} = item;


    return (
      <GridItem key={id} border="2px dashed #020281" p={0} bg="white">
        {children.map((item) => {
    switch (item.type) {
      case 'BANNER':
          return <Banner key={item.id} onTextChange={(text) => onBannerTextChange(text, item.id)} initialText={item.bannerText} />;
      case 'HERO':
          return <Hero key={item.id} onTextChange={(text) => onHeroTextChange(text, item.id)} initialText={item.heroText} />;
              case 'PAGE':
                return <PageContent key={item.id} onTextChange={(text) => onHeroTextChange(text, item.id)} initialText={item.heroText} />;
                default:
              return <div key={item.id}>{item.type}</div>;
          }
        })}

        <GridModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)}
              
              onSelect={handleComponentSelection} // Pass the function here
              />
        {!componentAdded[item.id] && (
          <Button onClick={() => {
            setIsModalOpen(true);
            setCurrentColumn(item.id)
          }}>
            Select components
          </Button>
        )}
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
    'threeColumnEqual': 'repeat(3, 472px)',
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

      {/* The new modal for selecting components */}
      <GridModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSelect={handleComponentSelection}
      />
    </Box>
  );
};

export default GridComponent;
