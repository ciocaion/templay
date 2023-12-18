'use client'
import React from "react";
import { Box, VStack, Image } from "@chakra-ui/react";
import ButtonGroup from '../ui/groupbutton';
import CustomDropdown from '../builder/dropdown';
import ButtonIcon from '../ui/iconbutton';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { useDraggable } from '@dnd-kit/core';

interface DraggableItemProps {
  id: string;
  content: React.ReactNode;
}


function Sidebar() {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const handleDropdownToggle = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };
  // Banner menu items
  const bannerMenuItems = [
    <DraggableItem id="banner" content={
      <ButtonIcon icon={<GridViewOutlinedIcon />} text="Banner" type="BANNER" />
    } />,
  ];

  // Hero menu items
  const heroMenuItems = [
    <DraggableItem id="hero" content={
      <ButtonIcon icon={<GridViewOutlinedIcon />} text="Hero" type="HERO" />
    } />,
  ];

// Grid layout menu items
const gridLayoutMenuItems = [
  <DraggableItem id="twoColumnEqual" content={<ButtonIcon icon={<GridViewOutlinedIcon />} text="2 Column Equal" type="GRID" layoutId="twoColumnEqual"/>} />,
  <DraggableItem id="twoColumnWideLeft" content={<ButtonIcon icon={<GridViewOutlinedIcon />} text="2 Column Wide Left" type="GRID" layoutId="twoColumnWideLeft"/>} />,
  <DraggableItem id="twoColumnWideRight" content={<ButtonIcon icon={<GridViewOutlinedIcon />} text="2 Column Wide Right" type="GRID" layoutId="twoColumnWideRight"/>} />,
  <DraggableItem id="threeColumnEqual" content={<ButtonIcon icon={<GridViewOutlinedIcon />} text="3 Column Equal" type="GRID" layoutId="threeColumnEqual"/>} />,
];

const pageMenuItems = [
  <DraggableItem id="page" content={
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="Card Standard" type="PAGE" />
  } />,
  <DraggableItem id="text" content={
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="Rich Text" type="TEXT" />
  } />,
  <DraggableItem id="image" content={
    <ButtonIcon icon={<GridViewOutlinedIcon />} text="Image Block" type="IMAGE" />
  } />,
];




  return (
    <Box w="360px" h="100vh" bg="#ffffff" padding="20px">
      <VStack align="stretch" spacing="20px">
        <Image src="/assets/logo.svg" alt="Logo" boxSize="50px" alignSelf="center" />
        <ButtonGroup />
        <CustomDropdown buttonLabel="Banner" menuItems={bannerMenuItems} isOpen={activeDropdown === 'Banner'}
          onToggle={() => handleDropdownToggle('Banner')}/>
        <CustomDropdown buttonLabel="Hero" menuItems={heroMenuItems} isOpen={activeDropdown === 'Hero'}
          onToggle={() => handleDropdownToggle('Hero')}/>
        <CustomDropdown buttonLabel="Grid Layout" menuItems={gridLayoutMenuItems} isOpen={activeDropdown === 'Grid Layout'}
          onToggle={() => handleDropdownToggle('Grid Layout')} />
        <CustomDropdown buttonLabel="Page Content" menuItems={pageMenuItems} isOpen={activeDropdown === 'Page Content'}
          onToggle={() => handleDropdownToggle('Page Content')}/>
      </VStack>
    </Box>
  );
}

function DraggableItem({ id, content }: DraggableItemProps) {
  const type = (content as React.ReactElement).props.type;

  // Debugging log to ensure id is correctly set
  console.log("Creating DraggableItem with ID:", id, "and Type:", type);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id, // Ensuring this is the specific layout id
    data: { type, layoutId: id } // Passing both type and specific layout id
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {content}
    </div>
  );
}

export default Sidebar;
