import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/builder/banner';
import Hero from '../components/builder/hero';
import GridComponent from '../components/builder/gridcomponent';
import PageContent from '../components/builder/pagecontent';
import RichText from '../components/builder/richtext';
import ImageBlock from '../components/builder/image';
import { DraggableItems } from './builder';
import { useRouter } from 'next/router';
import MainButton from '@/components/ui/mainbutton';
import SecondaryButton from '@/components/ui/secondarybutton';
import { Alert, AlertIcon, Box, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';



function PreviewPage() {
    const router = useRouter();
    const { items: itemsJson } = router.query;
    const items = itemsJson ? JSON.parse(decodeURIComponent(itemsJson as string)) : [];
    const [title, setTitle] = useState('');
    const [isTemplateNotFound, setIsTemplateNotFound] = useState(false);
    const { isOpen: isRetrieveModalOpen, onOpen: onRetrieveModalOpen, onClose: onRetrieveModalClose } = useDisclosure();
    const dummyOnChange = () => {}; // Dummy function for onTextChange

    const handleRetrieveTemplate = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/templates/${title}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const template = await response.json();
            if (template.template_json) {
                const parsedTemplateJson = JSON.parse(template.template_json);
                router.push(`/preview?items=${encodeURIComponent(JSON.stringify(parsedTemplateJson))}`);
                setIsTemplateNotFound(false);
            } else {
                setIsTemplateNotFound(true);
            }
        } catch (error) {
            console.error('Error retrieving template:', error);
            setIsTemplateNotFound(true);
        }
        onRetrieveModalClose();
    };

    const renderItem = (item:any, index:any) => {
        const key = item.type === 'GRID' ? `GRID-${index}` : item.id;

        switch (item.type) {
            case 'BANNER':
                return <Banner key={key} initialText={item.bannerText} onTextChange={dummyOnChange} />;
            case 'HERO':
                return <Hero key={key} initialText={item.heroText} onTextChange={dummyOnChange} />;
            case 'GRID':
                return (
                    <GridComponent 
                        key={`GRID-${index}`}
                        id={item.id}
                        layout={item.layoutType}
                        items={item.children}
                        appendChildren={() => {}}
                        onComponentAdd={() => {}}
                        onHeroTextChange={() => {}}
                        onBannerTextChange={() => {}}
                    />
                );
            case 'PAGE':
                return <PageContent key={key} initialText={item.cardText} onTextChange={dummyOnChange} />;
            case 'TEXT':
                return <RichText key={key} initialText={item.richText} onTextChange={dummyOnChange} />;
            case 'IMAGE':
                return <ImageBlock key={key} />;
            default:
                return null;
        }
    };

  return (
    <Box w="100vw" h="100vh" bg="#EBEBEB">
    <img src="/assets/header.png" alt="Header" />
      {items.length > 0 ? items.map(renderItem) : <p>No template data available to preview.</p>}
      <img src="/assets/footer.png" alt="Footer" />
      <Modal isOpen={isRetrieveModalOpen} onClose={onRetrieveModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Retrieve Template</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Template Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleRetrieveTemplate}>Retrieve</Button>
                        <Button variant="ghost" onClick={onRetrieveModalClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {isTemplateNotFound && (
                <Alert status="error">
                    <AlertIcon />
                    Template with this title does not exist!
                </Alert>
            )}

            <HStack spacing={4} justify="center" align="center" marginTop="16px">
                <SecondaryButton text="Retrieve Template" onClick={onRetrieveModalOpen} />
            </HStack>
    </Box>
  );
}

export default PreviewPage;
