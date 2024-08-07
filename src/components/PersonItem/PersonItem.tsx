import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Character } from "@/types/peopleType";
import { getPlanets } from "@/api/people";
import Link from "next/link";

type Props = {
  person: Character;
};

const PersonItem: React.FC<Props> = ({ person }) => {
  const [planets, setPlanets] = useState<{ url: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const characterId = person.url.split("/").slice(-2, -1)[0];

  useEffect(() => {
    setLoading(true);
    getPlanets()
      .then((response) => {
        setPlanets(response.results);
      })
      .finally(() => setLoading(false));
  }, []);

  const homeworld =
    planets.find((planet) => planet.url === person.homeworld)?.name ||
    "unknown";

  return (
    <Link href={`/character/${characterId}`} passHref>
      <Box
        as="li"
        display="flex"
        alignItems="center"
        p="2"
        bg="blue.50"
        mb="2"
        borderRadius="md"
        cursor="pointer"
      >
        <Text
          flex="1"
          cursor={loading ? "wait" : "pointer"}
          color={loading ? "gray.400" : "black"}
        >
          {person.name}
        </Text>
        <Text flex="1">{person.gender}</Text>
        <Text flex="1">{homeworld}</Text>
      </Box>
    </Link>
  );
};

export default PersonItem;
