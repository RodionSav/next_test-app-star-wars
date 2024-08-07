import React from "react";
import { Box } from "@chakra-ui/react";
import { PeopleList } from "../PeopleList/PeopleList";

/**
 * Main component displaying the summary of favorite counts and the list of people.
 * Initializes people data and related information on component mount.
 */
const AppContent: React.FC = () => {

  return (
    <Box p="6" bg="gray.900" borderRadius="md">
      <Box mb="6">
        <PeopleList />
      </Box>
    </Box>
  );
};

export default AppContent;
