"use client";
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    fetch('https://templay-backend.vercel.app') // Update with your backend URL and port
      .then(response => response.json())
      .then(data => console.log('Response from backend:', data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </ChakraProvider>
  );
}

export default MyApp;