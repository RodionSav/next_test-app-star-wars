import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxApp/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Text, Spinner } from "@chakra-ui/react";
import PersonItem from "../PersonItem/PersonItem";
import { peopleInit } from "../features/peopleSlice";

/**
 * Component for displaying a list of people with infinite scrolling.
 * It fetches more data when the user scrolls to the bottom of the list.
 */
export const PeopleList = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.people.items.results);
  const nextPageUrl = useAppSelector((state) => state.people.items.next);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch people data when the current page changes
  useEffect(() => {
    dispatch(peopleInit(currentPage));
  }, [dispatch, currentPage]);

  // Fetch more data when scrolling reaches the bottom
  const fetchMoreData = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={people.length}
      next={fetchMoreData}
      hasMore={!!nextPageUrl}
      loader={<Spinner />}
      endMessage={<Text>No more characters</Text>}
    >
      <Box bg="blue.200" p="4" borderRadius="md">
        <Box
          display="flex"
          alignItems="center"
          fontWeight="bold"
          p="2"
          bg="blue.400"
          color="white"
          borderRadius="md"
        >
          <Box flex="1">Heart</Box>
          <Box flex="1">Name</Box>
          <Box flex="1">Gender</Box>
          <Box flex="1">Home</Box>
        </Box>
        <Box as="ul" listStyleType="none" p="0">
          {people.map((person, index) => (
            <PersonItem key={index} person={person} />
          ))}
        </Box>
      </Box>
    </InfiniteScroll>
  );
};
