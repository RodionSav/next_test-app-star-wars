import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppDispatch, useAppSelector } from '../reduxApp/hooks';
import AppContent from '../components/AppContent/AppContent';
import * as peopleActions from '../components/features/peopleSlice';

jest.mock('../reduxApp/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../components/features/peopleSlice', () => ({
  peopleInit: jest.fn(),
  planetInit: jest.fn(),
  speciesInit: jest.fn(),
}));

describe('AppContent Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    useAppDispatch.mockReturnValue(mockDispatch);

    useAppSelector.mockImplementation((selector) =>
      selector({
        favourite: {
          maleFavorites: 5,
          femaleFavorites: 3,
          otherFavorites: 2,
        },
        people: {
          items: {
            results: [],
            next: null,
          },
        },
      })
    );
  });


  test('dispatches initialization actions on mount', () => {
    render(<AppContent />);

    expect(mockDispatch).toHaveBeenCalledWith(peopleActions.peopleInit());
    expect(mockDispatch).toHaveBeenCalledWith(peopleActions.planetInit());
    expect(mockDispatch).toHaveBeenCalledWith(peopleActions.speciesInit());
  });

  test('renders the PeopleList component', () => {
    render(<AppContent />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
