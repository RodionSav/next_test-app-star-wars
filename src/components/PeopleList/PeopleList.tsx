import { useState, useEffect, useMemo } from "react";
import { Box, Text, Spinner, Button, Flex, Input } from "@chakra-ui/react";
import PersonItem from "../PersonItem/PersonItem";
import { getPeopleWithPagination } from "@/api/people";
import { Character } from "@/types/peopleType";
import debounce from "lodash.debounce";  // Import debounce from lodash

const ITEMS_PER_PAGE = 10;

export const PeopleList = () => {
  const [people, setPeople] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingCharacter, setLoadingCharacter] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filtering, setFiltering] = useState(false); // State for filtering

  useEffect(() => {
    setLoading(true);
    getPeopleWithPagination(currentPage)
      .then((response) => {
        setPeople(response.results);
        setTotalPages(Math.ceil(response.count / ITEMS_PER_PAGE));
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  // Debounce the search input handler to avoid excessive re-renders
  const debouncedSearchChange = useMemo(() =>
    debounce((query) => {
      setSearchQuery(query);
      setFiltering(false); // End filtering
    }, 500), []);  // 500ms debounce delay

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setFiltering(true); // Start filtering
    debouncedSearchChange(query);
  };

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Handler for character click
  const handleCharacterClick = () => {
    setLoadingCharacter(true);
    setShowPagination(false);
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
      {/* Search Input */}
      <Input
        placeholder="Search by name"
        mb="4"
        onChange={handleSearchChange}
        color="yellow.300"
        borderColor="yellow.300"
        focusBorderColor="yellow.500"
        maxWidth='240px'
      />

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
        {loadingCharacter || loading || filtering ? ( // Show spinner during loading, character click, or filtering
          <Spinner
            margin="auto"
            color="yellow.300"
            width="70px"
            height="70px"
          />
        ) : filteredPeople.length > 0 ? (
          filteredPeople.map((person, index) => (
            <PersonItem
              key={index}
              person={person}
              onCharacterClick={handleCharacterClick}
            />
          ))
        ) : (
          <Text color="yellow.300">No characters found.</Text>
        )}
      </Flex>

      {/* Pagination Controls */}
      {showPagination && (
        <Flex justify="center" mt="4" gap="2" wrap="wrap">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            colorScheme="yellow"
            width={{ base: "25px", sm: "50px", md: "50px" }}
          >
            Prev
          </Button>
          <Button
            display={{ base: "none", sm: "inline-flex" }} // Hide ellipsis on mobile
            colorScheme="yellow"
            isDisabled={true}
            width={{ base: "20px" }}
          >
            ...
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
            display={{ base: "none", sm: "inline-flex" }} // Hide ellipsis on mobile
            colorScheme="yellow"
            isDisabled={true}
            width={{ base: "20px" }}
          >
            ...
          </Button>
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
