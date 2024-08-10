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
  const [loadingCharacter, setLoadingCharacter] = useState(false); // New state
  const [showPagination, setShowPagination] = useState(true); // New state for pagination visibility

  useEffect(() => {
    setLoading(true);
    getPeopleWithPagination(currentPage)
      .then((response) => {
        setPeople(response.results);
        setTotalPages(Math.ceil(response.count / ITEMS_PER_PAGE));
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  // Handler for character click
  const handleCharacterClick = () => {
    setLoadingCharacter(true); // Show spinner and hide pagination
    setShowPagination(false); // Hide pagination
  };

  // Reset pagination and character loading state when a character detail page is loaded
  useEffect(() => {
    if (!loadingCharacter) {
      setShowPagination(true);
    }
  }, [loadingCharacter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box p="4" borderRadius="md">
      {/* People List */}
      <Flex
        margin="auto"
        as="ul"
        listStyleType="none"
        p="0"
        mt="2"
        gap="10px"
        width={["100%", "100%", "740px"]}
        height={["1080px", "880px", "480px"]}
        flexWrap="wrap"
        justifyContent={{ base: "center", sm: "start", md: "start" }}
      >
        {loadingCharacter ? ( // Show spinner when character details are loading
          <Spinner
            margin="auto"
            color="yellow.300"
            width="70px"
            height="70px"
          />
        ) : loading ? (
          <Spinner
            margin="auto"
            color="yellow.300"
            width="70px"
            height="70px"
          />
        ) : people.length > 0 ? (
          people.map((person, index) => (
            <PersonItem
              key={index}
              person={person}
              onCharacterClick={handleCharacterClick} // Pass the handler to PersonItem
            />
          ))
        ) : (
          <Text color="yellow.300">No characters found.</Text>
        )}
      </Flex>

      {/* Pagination Controls */}
      {showPagination && ( // Show pagination only when not loading character details
        <Flex justify="center" mt="4" gap="2" wrap="wrap">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            colorScheme="yellow"
            width={{ base: "25px", sm: "50px", md: "50px" }}
          >
            Prev
          </Button>
          {Array.from(
            { length: Math.min(totalPages, 3) },
            (_, i) => i + Math.max(1, Math.min(currentPage - 1, totalPages - 2))
          ).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              colorScheme="yellow"
              variant={currentPage === page ? "solid" : "outline"}
              width={{ base: "20px" }}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            colorScheme="yellow"
            width={{ base: "25px", sm: "50px", md: "50px" }}
          >
            Next
          </Button>
        </Flex>
      )}
    </Box>
  );
};
