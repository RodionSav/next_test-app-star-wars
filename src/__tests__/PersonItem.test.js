import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonItem from '../components/PersonItem/PersonItem';
import { ChakraProvider } from '@chakra-ui/react';

const mockPerson = {
  name: 'Luke Skywalker',
  height: '172',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

describe('PersonItem', () => {
  it('renders person name, gender, and height correctly', () => {
    render(
      <ChakraProvider>
        <PersonItem person={mockPerson} />
      </ChakraProvider>
    );

    expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${mockPerson.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Height: ${mockPerson.height} cm`)).toBeInTheDocument();
  });

  it('renders a link with the correct href', () => {
    render(
      <ChakraProvider>
        <PersonItem person={mockPerson} />
      </ChakraProvider>
    );

    const characterId = mockPerson.url.split("/").slice(-2, -1)[0];
    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveAttribute('href', `/character/${characterId}`);
  });
});
