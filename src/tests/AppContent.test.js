// AppContent.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppDispatch, useAppSelector } from '@/reduxApp/hooks';
import AppContent from '../components/AppContent/AppContent';
import * as peopleActions from '../components/features/peopleSlice';


// Mock the actions
jest.mock('../components/features/peopleSlice', () => ({
  peopleInit: jest.fn(),
  planetInit: jest.fn(),
  speciesInit: jest.fn(),
}));

describe('AppContent Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockDispatch.mockClear();
    useAppDispatch.mockReturnValue(mockDispatch);

    // Mock useAppSelector to return specific test data
    useAppSelector.mockImplementation((selector) =>
      selector({
        favourite: {
          maleFavorites: 5,
          femaleFavorites: 3,
          otherFavorites: 2,
        },
      })
    );
  });

  test('renders the favorite counts correctly', () => {
    render(<AppContent />);

    expect(screen.getByText('5 Female fans')).toBeInTheDocument();
    expect(screen.getByText('3 Male fans')).toBeInTheDocument();
    expect(screen.getByText('2 Other fans')).toBeInTheDocument();
  });

  test('dispatches initialization actions on mount', () => {
    render(<AppContent />);

    expect(mockDispatch).toHaveBeenCalledWith(peopleActions.peopleInit());
    expect(mockDispatch).toHaveBeenCalledWith(peopleActions.planetInit());
    expect(mockDispatch).toHaveBeenCalledWith(peopleActions.speciesInit());
  });

  test('renders the PeopleList component', () => {
    render(<AppContent />);

    // This assumes PeopleList has some identifiable content or structure you can query
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
