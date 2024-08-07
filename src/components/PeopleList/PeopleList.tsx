import { useState, useEffect } from "react";
import { Box, Text, Spinner, Button, Flex } from "@chakra-ui/react";
import PersonItem from "../PersonItem/PersonItem";
import { getPeopleWithPagination } from "@/api/people";
import { Character } from "@/types/peopleType";

export const PeopleList = () => {
  const [people, setPeople] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch people data with pagination
  useEffect(() => {
    setLoading(true);
    getPeopleWithPagination(currentPage)
      .then((response) => {
        setPeople(response.results);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  // Handler for going to the next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Handler for going to the previous page
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Box bg="gray.900" p="4" borderRadius="md">
      {/* Header */}
      <Flex
        alignItems="center"
        justifyContent="start"
        fontWeight="bold"
        p="2"
        bg="gray.800"
        color="yellow.300"
        borderRadius="md"
      >
        <Box flex="1" textAlign="left">
          Name
        </Box>
        <Box flex="1" textAlign="left">
          Gender
        </Box>
        <Box flex="1" textAlign="left">
          Home
        </Box>
      </Flex>

      {/* People List */}
      <Box as="ul" listStyleType="none" p="0" mt="2">
        {loading ? (
          <Spinner color="yellow.300" />
        ) : people.length > 0 ? (
          people.map((person, index) => (
            <PersonItem key={index} person={person} />
          ))
        ) : (
          <Text color="yellow.300">No characters found.</Text>
        )}
      </Box>

      {/* Pagination Controls */}
      <Flex justify="space-between" mt="4">
        <Button
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
          colorScheme="yellow"
        >
          Previous
        </Button>
        <Text color="yellow.300">Page {currentPage}</Text>
        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === 9}
          colorScheme="yellow"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};
