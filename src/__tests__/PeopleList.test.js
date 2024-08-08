import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PeopleList } from '../components/PeopleList/PeopleList';
import { ChakraProvider } from '@chakra-ui/react';
import { getPeopleWithPagination } from '../api/people';
import { act } from 'react';  // Import act from 'react'

// Mock the API
jest.mock('../api/people');

const mockPeople = {
  results: [
    { name: 'Luke Skywalker', height: '172', gender: 'male', url: 'https://swapi.dev/api/people/1/' },
    { name: 'Leia Organa', height: '150', gender: 'female', url: 'https://swapi.dev/api/people/5/' },
  ],
  count: 2,
};

describe('PeopleList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of people after loading', async () => {
    getPeopleWithPagination.mockResolvedValueOnce(mockPeople);

    await act(async () => {
      render(
        <ChakraProvider>
          <PeopleList />
        </ChakraProvider>
      );
    });

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    getPeopleWithPagination.mockResolvedValueOnce(mockPeople);

    await act(async () => {
      render(
        <ChakraProvider>
          <PeopleList />
        </ChakraProvider>
      );
    });

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();

    const pageButton = screen.getByRole('button', { name: '1' });
    expect(pageButton).toHaveClass('chakra-button');
  });

  it('displays message when no characters are found', async () => {
    getPeopleWithPagination.mockResolvedValueOnce({ results: [], count: 0 });

    await act(async () => {
      render(
        <ChakraProvider>
          <PeopleList />
        </ChakraProvider>
      );
    });

    expect(await screen.findByText('No characters found.')).toBeInTheDocument();
  });

  it('changes pages when pagination buttons are clicked', async () => {
    const secondPagePeople = {
      results: [
        { name: 'Han Solo', height: '180', gender: 'male', url: 'https://swapi.dev/api/people/14/' },
      ],
      count: 11,
    };

    getPeopleWithPagination.mockResolvedValueOnce({ ...mockPeople, count: 11 });
    getPeopleWithPagination.mockResolvedValueOnce(secondPagePeople);

    await act(async () => {
      render(
        <ChakraProvider>
          <PeopleList />
        </ChakraProvider>
      );
    });

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '2' }));
    });

    expect(await screen.findByText('Han Solo')).toBeInTheDocument();
  });
});
