import React from 'react';
import Banner from './banner';
import Hero from './hero';
import GridComponent from './gridcomponent';
import { GridLayoutType } from './gridcomponent';
import PageContent from './pagecontent';
import RichText from './richtext';
import ImageBlock from './image';
import SecondaryButton from '../ui/secondarybutton'; 
import AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline';
import Cancel from '@mui/icons-material/Cancel'; 
import { DraggableItems, DraggableItem } from "../../pages/builder"

interface TemplateAreaProps {
  items: DraggableItems;
  openModal: () => void;
  onComponentAdd: (type: string, layoutType: GridLayoutType, gridId: string) => void;
  appendChildren: (id: string, items: DraggableItems, columnId?: string) => void;
  onDelete: (itemId: string) => void;
}

const TemplateArea: React.FC<TemplateAreaProps> = ({ items, openModal, onComponentAdd, appendChildren, onDelete }) => {

  const renderItem = (item: DraggableItem, index: number) => {
    const key = item.type === 'GRID' ? `GRID-${index}` : item.id;

    const deleteButton = (
      <button
      onClick={() => onDelete(item.id)}
        style={{display:'flex', justifyContent:'center',color:'red', position: 'absolute', top: 10, right: 10, zIndex: 10 }} // Adjust styling as needed
      >
        <Cancel /> {/* Use an X icon or text */}
      </button>
    );

    let component;
    switch (item.type) {
      case 'BANNER':
        component = <Banner key={key} />;
        break;
      case 'HERO':
        component = <Hero key={key} />;
        break;
      case 'GRID':
        component = (
          <GridComponent 
            key={`GRID-${index}`}
            id={item.id}
            layout={item.layoutType}
            items={item.children}
            appendChildren={appendChildren}
            onComponentAdd={onComponentAdd}
          />
        );
        break;
      case 'PAGE':
        component = <PageContent key={key} />;
        break;
      case 'TEXT':
        component = <RichText key={key} />;
        break;
      case 'IMAGE':
        return <ImageBlock key={key} />;
      default:
        component = null;
    }

    return (
      <div key={key} style={{ position: 'relative' }}>
        {component}
        {deleteButton}
      </div>
    );
  };

  return (
    <div
      style={{
        width: '80vw',
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
          onClick={openModal}
        />
      </div>
    </div>
  );
}

export default TemplateArea;
