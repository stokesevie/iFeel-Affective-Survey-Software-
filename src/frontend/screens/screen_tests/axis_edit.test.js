import React, { useState,useContext } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditAxis, { TextInput } from '../axis_edit';




// Mock dependencies
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useContext: jest.fn(),
}));
jest.mock('../../utils/auth_context', () => jest.fn());

describe('EditAxis', () => {
  // Define mock values
  const route = {
    params: {
    axis:'x',
      question: {
        x: {
          risk: 5,
          warn: 3,
          neg: 'Negative Axis Title',
          pos: 'Positive Axis Title',
        },
      },
      course: 'Test Course',
      questionNumber: 1,
      lab: { lab_title: 'Test Lab' },
    },
  };
  const navigation = {
    navigate: jest.fn(),
  };
  const url = 'https://example.com/api';
  const access = 'test-access-token';

  beforeEach(() => {
    // Reset mock values before each test
    jest.clearAllMocks();
    useState.mockReturnValue([false, jest.fn()]);
    useContext.mockReturnValue({ url });
    localStorage.setItem('authTokens', JSON.stringify({ access }));
  });

  test('renders without errors', () => {
    render(<EditAxis route={route} navigation={navigation} />);
  });

  test('calls updateAxis when save button is pressed', async () => {
    // Mock the fetch request
    global.fetch = jest.fn(() =>
      Promise.resolve({ status: 200, json: jest.fn(() => Promise.resolve({})) })
    );

    const { getByText } = render(<EditAxis route={route} navigation={navigation} />);
    const saveButton = getByText('Save');

    await fireEvent.press(saveButton);

    expect(navigation.navigate).toHaveBeenCalledWith('QuestionsEdit', {
      lab: route.params.lab,
      course: route.params.course,
      refresh: true,
    });
  });

  test('calls createAxis when create new axis button is pressed', () => {
    const { getByText } = render(<EditAxis route={route} navigation={navigation} />);
    const createNewAxisButton = getByText('Create new axis');

    fireEvent.press(createNewAxisButton);

    expect(navigation.navigate).toHaveBeenCalledWith('NewAxis', {
      axis: route.params.axis,
      question: route.params.question,
      course: route.params.course,
      lab: route.params.lab,
      questionNumber: route.params.questionNumber,
    });
  });


  test('updates posAxis state when positive axis title input changes', () => {
    useState.mockImplementation((initialState) => [initialState, jest.fn()]);
    const [posAxis,setPosAxis]= useState('')

    const { getByPlaceholderText } = render(<TextInput placeholder="Positive Axis Title" icon={'create-outline'}  onChangeText= {text => setPosAxis(text)}></TextInput>);

    fireEvent.changeText(getByPlaceholderText('Positive Axis Title'), "New Positive Axis");

    expect(setPosAxis).toHaveBeenCalledWith('New Positive Axis');
  });

  test('updates negAxis state when negative axis title input changes', () => {
    useState.mockImplementation((initialState) => [initialState, jest.fn()]);
    const [negAxis,setNegAxis]= useState('')

    const { getByPlaceholderText } = render(<TextInput placeholder="Negative Axis Title" icon={'create-outline'}  onChangeText= {text => setNegAxis(text)}></TextInput>);

    fireEvent.changeText(getByPlaceholderText('Negative Axis Title'), "New Negative Axis");

    expect(setNegAxis).toHaveBeenCalledWith('New Negative Axis');
  });

})
