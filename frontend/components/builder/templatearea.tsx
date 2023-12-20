import React from 'react';
import Banner from './banner';
import Hero from './hero';
import GridComponent from './gridcomponent';
import { GridLayoutType } from './gridcomponent';
import PageContent from './pagecontent';
import RichText from './richtext';
import ImageBlock from './image';
import SecondaryButton from '../ui/secondarybutton'; 
import AddCircleOutlineIcon  from '@mui/icons-material/VisibilityOutlined';
import {DraggableItems, DraggableItem} from "../../pages/builder"


// export interface TemplateItem {
//   id: string;
//   type: string;
//   layoutType?: GridLayoutType;
// }

interface TemplateAreaProps {
  items: DraggableItems;
  openModal: () => void; // Add openModal prop
  onComponentAdd: (type: string, layoutType: GridLayoutType, gridId: string) => void;
  appendChildren: (id: string, items: DraggableItems, columnId?: string) => void;
}

const TemplateArea: React.FC<TemplateAreaProps> = ({items,openModal, onComponentAdd, appendChildren  }) => {


  const renderItem = (item: DraggableItem, index: number) => {
    const key = item.type === 'GRID' ? `GRID-${index}` : item.id;

    switch (item.type) {
      case 'BANNER':
        return <Banner key={key} />;
      case 'HERO':
        return <Hero key={key} />;
      case 'GRID':
        return (
          <GridComponent 
            key={`GRID-${index}`}
            id={item.id}
            layout={item.layoutType }
            items={item.children}
            appendChildren={appendChildren}
            onComponentAdd={onComponentAdd}  // Pass the function to GridComponent
          />
        );
      case 'PAGE':
        return <PageContent key={key} />;
      case 'TEXT':
        return <RichText key={key} />;
      case 'IMAGE':
        return <ImageBlock key={key} />;
      default:
        return null;
    }
  };

  return (
    <div
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
      
      {/* Placeholder with Add Component Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        border: '2px dashed #cccccc',
        borderRadius: '4px',
        padding: '20px',
        margin: '10px',
        textAlign: 'center'
      }}>
         <SecondaryButton
          text="Add new component"
          icon={<AddCircleOutlineIcon style={{ color: '#020281' }} />}
          onClick={openModal} // Use the openModal function here
        />

      </div>
    </div>
  );
}

export default TemplateArea;
