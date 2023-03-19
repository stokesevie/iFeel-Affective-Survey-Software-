import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Demo from '../demo';

describe('Demo component', () => {
  const mockRoute = {
    params: {
      question: {
        x: { pos: 'Positive X', neg: 'Negative X' },
        y: { pos: 'Positive Y', neg: 'Negative Y' },
      },
      lab: { lab_number: 1 },
      questionNumber: 1,
    },
  };

  it('should render page title correctly', () => {
    const { getByText } = render(<Demo route={mockRoute} />);
    expect(getByText(`Survey for lab ${mockRoute.params.lab.lab_number}`)).toBeDefined();
  });

  it('should render question number correctly', () => {
    const { getByText } = render(<Demo route={mockRoute} />);
    expect(getByText(`This is question ${mockRoute.params.questionNumber}/3`)).toBeDefined();
  });

  it('should render grid correctly', () => {
    const { getAllByTestId } = render(<Demo route={mockRoute} />);
    const cells = getAllByTestId('grid-cell');
    expect(cells).toHaveLength(100);
  });


});
