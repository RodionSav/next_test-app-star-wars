import { useState, useEffect } from "react";
import { Box, Text, Spinner, Button, Flex } from "@chakra-ui/react";
import PersonItem from "../PersonItem/PersonItem";
import { getPeopleWithPagination } from "@/api/people";
import { Character } from "@/types/peopleType";

const ITEMS_PER_PAGE = 10;

export const PeopleList = () => {
  const [people, setPeople] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch people data with pagination
  useEffect(() => {
    setLoading(true);
    getPeopleWithPagination(currentPage)
      .then((response) => {
        setPeople(response.results);
        setTotalPages(Math.ceil(response.count / ITEMS_PER_PAGE)); // Calculate total pages
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  // Handler for going to a specific page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box bg="gray.900" p="4" borderRadius="md">
      {/* People List */}
      <Flex
        margin="auto"
        as="ul"
        listStyleType="none"
        p="0"
        mt="2"
        gap="10px"
        width="740px"
        height="420px"
        flexWrap="wrap"
      >
        {loading ? (
          <Spinner margin='auto' color="yellow.300" width='70px' height='70px' />
        ) : people.length > 0 ? (
          people.map((person, index) => (
            <PersonItem key={index} person={person} />
          ))
        ) : (
          <Text color="yellow.300">No characters found.</Text>
        )}
      </Flex>

      {/* Pagination Controls */}
      <Flex justify="center" mt="4" gap="2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          colorScheme="yellow"
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            colorScheme="yellow"
            variant={currentPage === i + 1 ? "solid" : "outline"}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          colorScheme="yellow"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};
