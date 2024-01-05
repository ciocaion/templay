import React from 'react';
import { Box, VStack, Flex, Text } from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppsIcon from '@mui/icons-material/Apps';
import { Tooltip } from '@chakra-ui/react'; // Import Tooltip

interface SidebarProps {
  onOpenTutorial: () => void;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenTutorial, isCollapsed }) => {
  const iconStyle = { marginRight: isCollapsed ? '0' : '12px', color: 'white' };
  const textStyle = { display: isCollapsed ? 'none' : 'block' };

  const handleCreateTemplateClick = () => {
    window.location.href = '/dashboard'; // Navigate to the dashboard when clicked
  };

  const handleAboutClick = () => {
    window.location.href = '/about'; // Navigate to the about page when clicked
  };

  return (
    <Box w={isCollapsed ? '60px' : '250px'} h="100vh" bg="#020281" p={4} paddingTop="56px">
      <VStack spacing={6} align="stretch" color="white">
        <Flex align="center">
          {isCollapsed ? (
            // Add Tooltip to the icon when collapsed
            <Tooltip label="Create New Template" placement="right">
              <AddIcon style={iconStyle} onClick={handleCreateTemplateClick} />
            </Tooltip>
          ) : (
            <AddIcon style={iconStyle} onClick={handleCreateTemplateClick} />
          )}
          <Text
            style={textStyle}
            fontSize="md"
            onClick={handleCreateTemplateClick}
            cursor="pointer"
          >
            Create New Template
          </Text>
        </Flex>
        <Flex align="center">
          {isCollapsed ? (
            // Add Tooltip to the icon when collapsed
            <Tooltip label="About" placement="right">
              <InfoIcon style={iconStyle} onClick={handleAboutClick} />
            </Tooltip>
          ) : (
            <InfoIcon style={iconStyle} onClick={handleAboutClick} />
          )}
          <Text
            style={textStyle}
            fontSize="md"
            onClick={handleAboutClick}
            cursor="pointer"
          >
            About
          </Text>
        </Flex>
        <Flex align="center">
          {isCollapsed ? (
            // Add Tooltip to the icon when collapsed
            <Tooltip label="View Components" placement="right">
              <AppsIcon style={iconStyle} onClick={onOpenTutorial} />
            </Tooltip>
          ) : (
            <AppsIcon style={iconStyle} onClick={onOpenTutorial} />
          )}
          <Text
            style={textStyle}
            fontSize="md"
            onClick={onOpenTutorial}
            cursor="pointer"
          >
            View Components
          </Text>
        </Flex>
        <Flex align="center">
          {isCollapsed ? (
            // Add Tooltip to the icon when collapsed
            <Tooltip label="View Tutorial" placement="right">
              <VisibilityIcon style={iconStyle} onClick={onOpenTutorial} />
            </Tooltip>
          ) : (
            <VisibilityIcon style={iconStyle} onClick={onOpenTutorial} />
          )}
          <Text
            style={textStyle}
            fontSize="md"
            onClick={onOpenTutorial}
            cursor="pointer"
          >
            View Tutorial
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Sidebar;
