import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
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

  it('should change cell color when pressed',async () => {
    const { getAllByTestId } = render(<Demo route={mockRoute} />);
    const cell = getAllByTestId('grid-cell')[0];
    fireEvent.press(cell);
    waitFor(()=>{
        expect(cell.props.style.color).toBe('red');
    })

  });

});
