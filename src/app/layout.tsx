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
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <ChakraProvider theme={theme}>
          {/* Видео фон */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          >
            <source src="/wallpaper-v7.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Заголовок */}
          <Text
            color="yellow.400"
            textTransform="uppercase"
            fontSize="36px"
            fontWeight="bold"
            letterSpacing="wide"
            ml="10px"
            zIndex={1} // Убедитесь, что текст поверх видео
          >
            Star Wars Heroes
          </Text>

          {/* Дочерние элементы */}
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
