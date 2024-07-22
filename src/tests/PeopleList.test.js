import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PeopleList from '../PeopleList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  people: {
    items: { results: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/', gender: 'male', homeworld: 'https://swapi.dev/api/planets/1/' }] },
    itemsPlanets: { results: [{ name: 'Tatooine', url: 'https://swapi.dev/api/planets/1/' }] },
  },
};

describe('PeopleList', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders PeopleList component', () => {
    render(
      <Provider store={store}>
        <PeopleList />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });
});
