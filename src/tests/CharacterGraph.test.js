import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CharacterGraph from '../CharacterGraph';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  people: {
    items: { results: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/', films: ['https://swapi.dev/api/films/1/'], starships: ['https://swapi.dev/api/starships/1/'] }] },
    itemsFilms: { results: [{ title: 'A New Hope', url: 'https://swapi.dev/api/films/1/' }] },
    itemsStarships: { results: [{ name: 'X-wing', url: 'https://swapi.dev/api/starships/1/' }] },
  },
};

describe('CharacterGraph', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders CharacterGraph component', () => {
    render(
      <Provider store={store}>
        <CharacterGraph characterId="1" />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('X-wing')).toBeInTheDocument();
  });
});
