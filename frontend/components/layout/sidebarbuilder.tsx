import React, { useState } from "react";
import { Box, VStack, Flex, Text, Tooltip, Button } from "@chakra-ui/react";
import SaveIcon from "@mui/icons-material/Save";
import RetrieveIcon from "@mui/icons-material/GetApp"; // Example icon for Retrieve
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SidebarProps {
  onSave: () => void;
  onRetrieve: () => void;
  onDelete: () => void;
  onPreview: () => void;
  isCollapsed: boolean;
  children?: React.ReactNode;
}

const SidebarBuilder: React.FC<SidebarProps> = ({
  onSave,
  onRetrieve,
  onDelete,
  onPreview,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const textStyle = { display: isCollapsed ? "none" : "block" };
  const iconStyle = { color: "white", cursor: "pointer", marginRight: "12px" };
  const buttonStyle = { width: "100%", justifyContent: "flex-start" };

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
        {/* Save Template */}
        <Flex align="center">
          {isCollapsed ? (
            <Tooltip label="Save Template" placement="right">
              <SaveIcon style={iconStyle} onClick={onSave} />
            </Tooltip>
          ) : (
            <Button
              backgroundColor="#1AFF80"
              style={buttonStyle}
              onClick={onSave}
            >
              Save Template
            </Button>
          )}
        </Flex>

        {/* Retrieve Template */}
        <Flex align="center">
          {isCollapsed ? (
            <Tooltip label="Retrieve Template" placement="right">
              <RetrieveIcon style={iconStyle} onClick={onRetrieve} />
            </Tooltip>
          ) : (
            <Button
              backgroundColor="#FF80FF"
              style={buttonStyle}
              onClick={onRetrieve}
            >
              Retrieve Template
            </Button>
          )}
        </Flex>

        {/* Delete Template */}
        <Flex align="center">
          {isCollapsed ? (
            <Tooltip label="Delete Template" placement="right">
              <DeleteIcon style={iconStyle} onClick={onDelete} />
            </Tooltip>
          ) : (
            <Button colorScheme="red" style={buttonStyle} onClick={onDelete}>
              Delete Template
            </Button>
          )}
        </Flex>

        {/* Preview Template */}
        <Flex align="center">
          {isCollapsed ? (
            <Tooltip label="Preview Template" placement="right">
              <PreviewIcon style={iconStyle} onClick={onPreview} />
            </Tooltip>
          ) : (
            <Button
              backgroundColor="#1F9DFF"
              style={buttonStyle}
              onClick={onPreview}
            >
              Preview Template
            </Button>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};

export default SidebarBuilder;
