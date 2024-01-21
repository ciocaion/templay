import React, { useState } from "react";
import { Box, VStack, Flex, Text, Tooltip, Button } from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveIcon from "@mui/icons-material/Save";
import RetrieveIcon from "@mui/icons-material/GetApp";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import ShareIcon from "@mui/icons-material/Share";

interface SidebarProps {
  onOpenTutorial: () => void;
  onSave: () => void;
  onRetrieve: () => void;
  onDelete: () => void;
  onPreview: () => void;
  onOpenMetadata: () => void;
  isCollapsed: boolean;
  isBuilderPage: boolean;
  isPreviewPage: boolean;
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  onOpenTutorial,
  onSave,
  onRetrieve,
  onDelete,
  onPreview,
  onOpenMetadata,
  isBuilderPage,
  isPreviewPage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const textStyle = {
    display: isCollapsed ? "none" : "block",
    marginLeft: "12px",
  };
  const buttonStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: isCollapsed ? "center" : "flex-start",
  };

  const handleCreateTemplateClick = () => {
    window.location.href = "/dashboard";
  };

  const handleAboutClick = () => {
    window.location.href = "/about";
  };

  const handleComponentsClick = () => {
    window.location.href = "/components";
  };

  const handleShareClick = () => {
    const url = window.location.href; // Gets the current URL
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!"); // You can replace this with a more sophisticated notification
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <Box
      w={isCollapsed ? "72px" : "250px"}
      h="100vh"
      bg="#020281"
      p={4}
      paddingTop="56px"
      display="flex"
      flexDirection="column"
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
                  width: "20px",
                  height: "20px",
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
                width: "20px",
                height: "20px",
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
              <AddIcon
                style={{
                  color: "white",
                  width: "20px",
                  height: "20px",
                }}
                onClick={handleCreateTemplateClick}
              />
            </Tooltip>
          ) : (
            <AddIcon
              style={{
                color: "white",
                width: "20px",
                height: "20px",
              }}
              onClick={handleCreateTemplateClick}
            />
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
              <InfoIcon
                style={{
                  color: "white",
                  width: "20px",
                  height: "20px",
                }}
                onClick={handleAboutClick}
              />
            </Tooltip>
          ) : (
            <InfoIcon
              style={{
                color: "white",
                width: "20px",
                height: "20px",
              }}
              onClick={handleAboutClick}
            />
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
        {!isPreviewPage && !isBuilderPage && (
          <Flex align="center">
            {isCollapsed ? (
              // Add Tooltip to the icon when collapsed
              <Tooltip label="View Components" placement="right">
                <AppsIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                  onClick={handleComponentsClick}
                />
              </Tooltip>
            ) : (
              <AppsIcon
                style={{
                  color: "white",
                  width: "20px",
                  height: "20px",
                }}
                onClick={handleComponentsClick}
              />
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
        )}
        {!isPreviewPage && !isBuilderPage && (
          <Flex align="center">
            {isCollapsed ? (
              <Tooltip label="View Tutorial" placement="right">
                <VisibilityIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                  onClick={onOpenTutorial}
                />
              </Tooltip>
            ) : (
              <VisibilityIcon
                style={{
                  color: "white",
                  width: "20px",
                  height: "20px",
                }}
                onClick={onOpenTutorial}
              />
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
        )}

        {isBuilderPage && (
          <>
            <Tooltip label="Save Template" placement="right">
              <Button
                onClick={onSave}
                colorScheme="green"
                style={buttonStyle}
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                <SaveIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Text style={textStyle} fontSize="md">
                  Save Template
                </Text>
              </Button>
            </Tooltip>
            <Tooltip label="Retrieve Template" placement="right">
              <Button
                onClick={onRetrieve}
                colorScheme="pink"
                style={buttonStyle}
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                <RetrieveIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Text style={textStyle} fontSize="md">
                  Retrieve Template
                </Text>
              </Button>
            </Tooltip>
            <Tooltip label="Delete Template" placement="right">
              <Button
                onClick={onDelete}
                colorScheme="red"
                style={buttonStyle}
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                <DeleteIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Text style={textStyle} fontSize="md">
                  Delete Template
                </Text>
              </Button>
            </Tooltip>
            <Tooltip label="Preview Template" placement="right">
              <Button
                onClick={onPreview}
                colorScheme="blue"
                style={buttonStyle}
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                <PreviewIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Text style={textStyle} fontSize="md">
                  Preview Template
                </Text>
              </Button>
            </Tooltip>
          </>
        )}
        {isPreviewPage && (
          <>
            <Tooltip label="Retrieve Template" placement="right">
              <Button
                onClick={onRetrieve}
                colorScheme="pink"
                style={buttonStyle}
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                <RetrieveIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Text style={textStyle} fontSize="md">
                  Retrieve Template
                </Text>
              </Button>
            </Tooltip>
            <Tooltip label="Metadata Information" placement="right">
              <Button
                onClick={onOpenMetadata}
                colorScheme="yellow"
                style={buttonStyle}
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                <InfoIcon
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Text style={textStyle} fontSize="md">
                  Metadata Info
                </Text>
              </Button>
            </Tooltip>
            {/* <Tooltip label="Share Template" placement="right">
    <Button
      onClick={handleShareClick}
      colorScheme="teal"
      style={buttonStyle}
      justifyContent={isCollapsed ? 'center' : 'flex-start'}
    >
      <ShareIcon
        style={{
          color: "white",
          width: "20px",
          height: "20px",
        }}
      />
      <Text style={textStyle} fontSize="md">
        Share Template
      </Text>
    </Button>
  </Tooltip> */}
          </>
        )}
      </VStack>
    </Box>
  );
};
export default Sidebar;
