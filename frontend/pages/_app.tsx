"use client";
import React, { useEffect, useId } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';


function MyApp({ Component, pageProps }: AppProps) {

  const id = useId()


  useEffect(() => {
    fetch('https://templay-backend.vercel.app/api') // Update with your backend URL and port
      .then(response => response.json())
      .then(data => console.log('Response from backend:', data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;