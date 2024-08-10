"use client";

import { useRouter } from "next/navigation";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPerson } from "@/api/people";
import CharacterGraph from "@/components/CharacterGraph/CharacterGraph";
import { Character } from "@/types/peopleType";

const CharacterDetailPage = ({ params }: { params: { id: string } }) => {
  const [person, setPerson] = useState<Character | null>(null);
  const router = useRouter();
  const personId = params.id;

  useEffect(() => {
    getPerson(personId).then((response: any) => setPerson(response));
  }, [personId]);

  if (!person) {
    return <Text color="yellow.400">Loading...</Text>;
  }

  return (
    <Flex justifyContent="center" alignItems="center" bg="gray.900" p="6" minHeight="100vh">
      {/* Overlay background for dimming */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex="0"
      />

      {/* Main container for content */}
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
        position="relative"
        zIndex="1"  // Keeps the content above the overlay
      >
        <Text fontSize="3xl" fontWeight="bold" mb="6" color="yellow.400">
          {person.name}
        </Text>

        <Text mb="3">Birth Year: {person.birth_year}</Text>
        <Text mb="3">Eye Color: {person.eye_color}</Text>
        <Text mb="3">Gender: {person.gender}</Text>
        <Text mb="3">Hair Color: {person.hair_color}</Text>
        <Text mb="3">Height: {person.height}</Text>
        <Text mb="3">Mass: {person.mass}</Text>
        <Text mb="3">Skin Color: {person.skin_color}</Text>

        <CharacterGraph characterId={personId} person={person} />

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
