"use client";
import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import Header from "../components/layout/header"; // Ensure correct path

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Fetch data or perform other global side effects here
  }, []);

  return (
    <ChakraProvider>
      <VStack spacing={0} align="stretch" minH="100vh">
        <Header />
        <Component {...pageProps} />
      </VStack>
    </ChakraProvider>
  );
}

export default MyApp;
