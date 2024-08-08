"use client";

import { useRouter } from "next/navigation";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPerson } from "@/api/people";
import CharacterGraph from "@/components/CharacterGraph/CharacterGraph";
import { Character } from "@/types/peopleType";

const CharacterDetailPage = ({ params }: { params: { id: string } }) => {
  // State to hold the character's details
  const [person, setPerson] = useState<Character | null>(null);

  // Router instance to handle navigation
  const router = useRouter();

  // Extract the person ID from the route parameters
  const personId = params.id;

  // Fetch character details when the component mounts
  useEffect(() => {
    getPerson(personId).then((response: any) => setPerson(response));
  }, [personId]); // Dependency array ensures this effect runs when personId changes

  // If the character data is still loading, show a loading message
  if (!person) {
    return <Text color="yellow.400">Loading...</Text>;
  }

  return (
    // Main container for the character detail page
    <Flex justifyContent="center" alignItems="center" bg="gray.900" p="6">
      {/* Box containing character information and graph */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        p="8"
        bg="gray.800"
        borderRadius="md"
        boxShadow="2xl"
        width="full"
        maxW="100%"
        color="white"
        textAlign="start"
      >
        {/* Display character's name */}
        <Text fontSize="3xl" fontWeight="bold" mb="6" color="yellow.400">
          {person.name}
        </Text>

        {/* Display various attributes of the character */}
        <Text mb="3">Birth Year: {person.birth_year}</Text>
        <Text mb="3">Eye Color: {person.eye_color}</Text>
        <Text mb="3">Gender: {person.gender}</Text>
        <Text mb="3">Hair Color: {person.hair_color}</Text>
        <Text mb="3">Height: {person.height}</Text>
        <Text mb="3">Mass: {person.mass}</Text>
        <Text mb="3">Skin Color: {person.skin_color}</Text>

        {/* Render the character's graph */}
        <CharacterGraph characterId={personId} person={person} />

        {/* Back button to return to the previous page */}
        <Button
          onClick={() => router.back()}
          colorScheme="yellow"
          mt="6"
          width="full"
        >
          Back to List
        </Button>
      </Box>
    </Flex>
  );
};

export default CharacterDetailPage;
