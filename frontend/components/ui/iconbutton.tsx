import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

interface IconButtonExampleProps {
  icon: React.ReactElement;
  text: string;
  type: 'BANNER' | 'HERO' | 'GRID' | 'PAGE'| 'TEXT' | 'IMAGE';
  layoutId?: string; 
}

function ButtonIcon({ icon, text, type, layoutId }: IconButtonExampleProps) {
  const draggableId = layoutId || type; 
  const [isDragging, setIsDragging] = useState(false);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: draggableId,
    data: { type, layoutId: draggableId }
  });

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      // Add global event listeners when dragging starts
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchend', handleDragEnd);
    } else {
      // Remove global event listeners when dragging ends
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    }

    return () => {
      // Clean up global event listeners
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]); // Effect dependencies

  const draggingStyle = isDragging ? {
    background: "#E2E8F0",
    cursor: 'grabbing',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
  } : {};

  return (
    <Button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      leftIcon={icon}
      bg="#F5F5F5"
      color="#8C8C8C"
      marginBottom="8px"
      borderStyle="none"
      padding="8px"
      style={draggingStyle}
    >
      {text}
    </Button>
  );
}

export default ButtonIcon;
