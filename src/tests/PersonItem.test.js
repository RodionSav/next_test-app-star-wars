import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PersonItem from '../components/PersonItem/PersonItem';
import * as favouriteActions from '../components/features/favouriteSlice';

const mockStore = configureStore([]);
const mockCharacter = {
  name: 'Luke Skywalker',
  gender: 'male',
  homeworld: 'http://swapi.dev/api/planets/1/',
  url: 'http://swapi.dev/api/people/1/',
};

describe('PersonItem', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      people: {
        itemsPlanets: {
          results: [{ url: 'http://swapi.dev/api/planets/1/', name: 'Tatooine' }],
        },
      },
      favourite: {
        male: 0,
        female: 0,
        other: 0,
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders character information correctly', () => {
    render(
      <Provider store={store}>
        <PersonItem person={mockCharacter} />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('🤍')).toBeInTheDocument();
  });

  test('toggles favourite status and updates the store', () => {
    render(
      <Provider store={store}>
        <PersonItem person={mockCharacter} />
      </Provider>
    );

    const favouriteButton = screen.getByRole('button', { name: '🤍' });

    fireEvent.click(favouriteButton);
    expect(favouriteButton).toHaveTextContent('❤️');
    expect(store.dispatch).toHaveBeenCalledWith(favouriteActions.incrementFemaleFavorites());

    fireEvent.click(favouriteButton);
    expect(favouriteButton).toHaveTextContent('🤍');
    expect(store.dispatch).toHaveBeenCalledWith(favouriteActions.decrementFemaleFavorites());
  });
});
