import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/reduxApp/hooks';
import { useEffect } from 'react';
import * as peopleActions from '../features/peopleSlice';
import { PeopleList } from '../PeopleList/PeopleList';

/**
 * Main component displaying the summary of favorite counts and the list of people.
 * Initializes people data and related information on component mount.
 */

const AppContent = () => {
  const dispatch = useAppDispatch();
  const maleFavourites = useAppSelector((state) => state.favourite.maleFavorites);
  const femaleFavourites = useAppSelector((state) => state.favourite.femaleFavorites);
  const otherFavourites = useAppSelector((state) => state.favourite.otherFavorites);

  // Fetch initial data for people, planets, and species
  useEffect(() => {
    dispatch(peopleActions.peopleInit());
    dispatch(peopleActions.planetInit());
    dispatch(peopleActions.speciesInit());
  }, [dispatch]);

  return (
    <Box p="4" bg="blue.100" borderRadius="md">
      <Box mb="4">
        <Box bg="purple.300" color="white" p="3" borderRadius="md" fontWeight="bold" display="inline-block" width={'150px'} textAlign={'center'}>
          <span>{maleFavourites}</span> Female fans
        </Box>
        <Box bg="blue.300" color="white" p="3" borderRadius="md" fontWeight="bold" display="inline-block" ml="2" width={'150px'} textAlign={'center'}>
          <span>{femaleFavourites}</span> Male fans
        </Box>
        <Box bg="green.300" color="white" p="3" borderRadius="md" fontWeight="bold" display="inline-block" ml="2" width={'150px'} textAlign={'center'}>
          <span>{otherFavourites}</span> Other fans
        </Box>
      </Box>
      <PeopleList />
    </Box>
  );
};

export default AppContent;
