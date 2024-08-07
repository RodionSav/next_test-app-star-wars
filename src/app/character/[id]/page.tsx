'use client';

import { useRouter } from "next/navigation";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPerson } from "@/api/people";
import CharacterGraph from "@/components/CharacterGraph/CharacterGraph";
import { Character } from "@/types/peopleType";

const CharacterDetailPage = ({ params }: { params: { id: string }}) => {
  const [person, setPerson] = useState<Character | null>(null);
  const router = useRouter();
  const personId = params.id;

  useEffect(() => {
    getPerson(personId)
      .then((response: any) => setPerson(response))
  }, [personId]);

  if (!person) {
    return <Text color="yellow.400">Loading...</Text>;
  }

  return (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.900"
      p="6"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        p="8"
        bg="gray.800"
        borderRadius="md"
        boxShadow="2xl"
        width="full"
        maxW="1200px"
        color="white"
        textAlign='start'
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
        <CharacterGraph characterId={personId} />
        <Button onClick={() => router.back()} colorScheme="yellow" mt="6" width="full">
          Back to List
        </Button>
      </Box>
    </Flex>
  );
};

export default CharacterDetailPage;
