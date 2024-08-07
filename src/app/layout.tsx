"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider, theme, Text } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: theme.colors.gray[900] }}
      >
        <ChakraProvider theme={theme}>
          <Text
            color="yellow.400"
            textTransform="uppercase"
            fontSize="36px"
            fontWeight="bold"
            letterSpacing="wide"
            ml='10px'
          >
            Star Wars Heroes
          </Text>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
