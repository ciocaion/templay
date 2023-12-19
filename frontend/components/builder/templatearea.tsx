import React from 'react';
import { useDroppable } from '@dnd-kit/core'; 
import Banner from './banner';
import Hero from './hero';
import GridComponent from './gridcomponent';
import { GridLayoutType } from './gridcomponent';
import { DraggableItem } from '../../types'
import PageContent from './pagecontent';
import RichText from './richtext';
import ImageBlock from './image';

export interface TemplateItem {
  id: string;
  type: string;
  layoutType?: GridLayoutType;
}

interface TemplateAreaProps {
  items: TemplateItem[];
  gridItems: { [key: string]: DraggableItem[] };
  onDrop: (droppableId: string, draggableId: string, draggableItem: TemplateItem) => void;
}

const TemplateArea: React.FC<TemplateAreaProps> = ({ items, gridItems, onDrop }) => {
  const { setNodeRef } = useDroppable({ id: 'droppable' });

  const renderItem = (item: TemplateItem, index: number) => {
    const key = item.type === 'GRID' ? `GRID-${index}` : item.id;

    switch (item.type) {
      case 'BANNER':
        console.log('Rendering BANNER:', item);
        return <Banner key={key} />;
      case 'HERO':
        console.log('Rendering HERO:', item);
        return <Hero key={key} />;
      case 'GRID':
        console.log('Rendering GRID:', item);
        return (
          <div key={key}>
            {item.layoutType && 
              <GridComponent 
                layout={item.layoutType} 
                items={gridItems}
                onDrop={(droppableId, draggableId, draggableItem) => {
                  console.log('Dropping onto GRID:', droppableId, draggableId, draggableItem);
                  onDrop(droppableId, draggableId, draggableItem);
                }} 
              />
            }
          </div>
        );
      case 'PAGE':
        console.log('Rendering PAGE:', item);
        return <PageContent key={key} />;
      case 'TEXT':
        console.log('Rendering TEXT:', item);
        return <RichText key={key} />;
      case 'IMAGE':
        console.log('Rendering IMAGE:', item);
        return <ImageBlock key={key} />;
      default:
        return null;
    }
  };

  console.log('Rendering TemplateArea:', items);

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '60vw',
        minHeight: '100vh',
        marginTop: '24px',
        marginBottom: '24px',
        border: '1px solid white',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        overflow: 'auto'
      }}
    >
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}

export default TemplateArea;
