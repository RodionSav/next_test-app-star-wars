import { Box, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import * as favouriteActions from "../features/favouriteSlice";
import CharacterGraph from "../CharacterGraph/CharacterGraph";
import { Character } from "@/types/peopleType";
import { useAppDispatch, useAppSelector } from "@/reduxApp/hooks";

type Props = {
  person: Character;
};

const PersonItem: React.FC<Props> = ({ person }) => {
  const dispatch = useAppDispatch();
  const [isFavourite, setIsFavourite] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const planets = useAppSelector((state) => state.people.itemsPlanets.results);

  // Find the name of the homeworld of the person
  const homeworld =
    planets.find((planet) => planet.url === person.homeworld)?.name ||
    "unknown";

  // Toggle the favorite status of the person and update the count in the store
  const handleFavouriteAdder = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite) {
      if (person.gender === "male") {
        //  Database error: female is being recorded as male.
        dispatch(favouriteActions.incrementFemaleFavorites());
      } else if (person.gender === "female") {
        dispatch(favouriteActions.incrementMaleFavorites());
      } else {
        dispatch(favouriteActions.incrementOtherFavorites());
      }
    } else {
      if (person.gender === "male") {
        dispatch(favouriteActions.decrementFemaleFavorites());
      } else if (person.gender === "female") {
        dispatch(favouriteActions.decrementMaleFavorites());
      } else {
        dispatch(favouriteActions.decrementOtherFavorites());
      }
    }
  };

  return (
    <Box
      as="li"
      display="flex"
      alignItems="center"
      p="2"
      bg="blue.50"
      mb="2"
      borderRadius="md"
    >
      {!showGraph && (
        <>
          <Button onClick={handleFavouriteAdder} marginRight={275}>
            {isFavourite ? "❤️" : "🤍"}
          </Button>
          <Text
            flex="1"
            onClick={() => setShowGraph(!showGraph)}
            cursor="pointer"
          >
            {person.name}
          </Text>
          <Text flex="1">{person.gender}</Text>
          <Text flex="1">{homeworld}</Text>
        </>
      )}
      {showGraph && (
        <>
          <CharacterGraph
            characterId={person.url.split("/").slice(-2, -1)[0]}
          />
          <Button
            onClick={() => setShowGraph(!showGraph)}
            bg="red.500"
            textColor="white.200"
            right='0'
            marginBottom='38%'
          >
            Close information
          </Button>
        </>
      )}
    </Box>
  );
};

export default PersonItem;
