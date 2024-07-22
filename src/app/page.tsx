"use client";

import AppContent from "@/components/AppContent/AppContent";
import { store } from "@/reduxApp/store";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <div>
      <Provider store={store}>
        <ChakraProvider theme={theme} >
          <AppContent />
        </ChakraProvider>
      </Provider>
    </div>
  );
}
