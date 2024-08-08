import { Flex, Text } from "@chakra-ui/react";
import { Character } from "@/types/peopleType";
import Link from "next/link";

type Props = {
  person: Character;
};

const PersonItem: React.FC<Props> = ({ person }) => {
  const characterId = person.url.split("/").slice(-2, -1)[0];

  return (
    <Link href={`/character/${characterId}`} passHref>
      <Flex
        as="li"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p="4"
        bg="black"
        mb="2"
        borderRadius="md"
        cursor="pointer"
        width={{ base: '110px', sm: '120px', md: '140px' }}
        height={{ base: "200px", md: "200px" }}
        border="2px solid #FFD700"
        color="white"
        fontFamily="'Star Jedi', sans-serif"
        textAlign="center"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb="2">
          {person.name}
        </Text>
        <Text fontSize={{ base: "sm", md: "sm" }} mb="1">
          Gender: {person.gender}
        </Text>
        <Text fontSize={{ base: "sm", md: "sm" }} mb="1">
          Height: {person.height} cm
        </Text>
      </Flex>
    </Link>
  );
};

export default PersonItem;
