import React, { useState } from "react";
import { Box, VStack, Flex, Text, Tooltip } from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SidebarProps {
  onOpenTutorial: () => void;
  onSave: () => void;
  onRetrieve: () => void;
  onDelete: () => void;
  onPreview: () => void;
  isCollapsed: boolean;
  isBuilderPage: boolean;
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  onOpenTutorial,
  onSave,
  onRetrieve,
  onDelete,
  onPreview,
  isBuilderPage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const iconStyle = { marginRight: isCollapsed ? "0" : "12px", color: "white" };
  const textStyle = { display: isCollapsed ? "none" : "block" };

  const handleCreateTemplateClick = () => {
    window.location.href = "/dashboard";
  };

  const handleAboutClick = () => {
    window.location.href = "/about";
  };

  const handleComponentsClick = () => {
    window.location.href = "/components";
  };

  return (
    <Box
      w={isCollapsed ? "60px" : "250px"}
      h="100vh"
      bg="#020281"
      p={4}
      paddingTop="56px"
    >
      <VStack spacing={6} align="stretch" color="white">
        <Flex align="left" justify="left" mb={12}>
          {isCollapsed ? (
            <Tooltip label="Expand sidebar" placement="right">
              <ArrowForwardIosIcon
                style={{
                  color: "#020281",
                  cursor: "pointer",
                  border: "2px solid white",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  marginRight: "12px",
                }}
                onClick={toggleSidebar}
              />
            </Tooltip>
          ) : (
            <ArrowBackIosNewIcon
              style={{
                color: "#020281",
                cursor: "pointer",
                border: "2px solid white",
                backgroundColor: "white",
                borderRadius: "20px",
                marginRight: "12px",
              }}
              onClick={toggleSidebar}
            />
          )}
          <Text
            style={textStyle}
            fontSize="md"
            onClick={toggleSidebar}
            cursor="pointer"
          >
            Collapse sidebar
          </Text>
        </Flex>
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
              <AppsIcon style={iconStyle} onClick={handleComponentsClick} />
            </Tooltip>
          ) : (
            <AppsIcon style={iconStyle} onClick={handleComponentsClick} />
          )}
          <Text
            style={textStyle}
            fontSize="md"
            onClick={handleComponentsClick}
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
        {isBuilderPage && (
          <>
            <Flex align="center" onClick={onSave} cursor="pointer">
              <Text style={textStyle} fontSize="md">
                Save Template
              </Text>
            </Flex>
            <Flex align="center" onClick={onRetrieve} cursor="pointer">
              <Text style={textStyle} fontSize="md">
                Retrieve Template
              </Text>
            </Flex>
            <Flex align="center" onClick={onDelete} cursor="pointer">
              <Text style={textStyle} fontSize="md">
                Delete Template
              </Text>
            </Flex>
            <Flex align="center" onClick={onPreview} cursor="pointer">
              <Text style={textStyle} fontSize="md">
                Preview Template
              </Text>
            </Flex>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Sidebar;
