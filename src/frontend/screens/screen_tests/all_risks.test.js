import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';
import AllRisks from '../all_risks';
import fetchMock from 'jest-fetch-mock';

import AuthContext from '../../utils/auth_context';

let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));

const url = 'http://example.com'

describe('AllRisks component', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  const mockRoute = {
    params: {
      student: '1',
    },
  };

  const mockRisks = [
    {
      student_name: 'John Doe',
      student_id: '1',
      course_name: 'Math',
      lab_number: '1',
      axis_neg: 'Attendance',
      risk: true,
    },
    {
      student_name: 'John Doe',
      student_id: '1',
      course_name: 'Math',
      lab_number: '2',
      axis_neg: 'Participation',
      warning: true,
    },
    {
      student_name: 'John Doe',
      student_id: '1',
      course_name: 'Physics',
      lab_number: '1',
      axis_pos: 'Quiz scores',
      avg: true,
    },
  ];

  beforeEach(() => {
    fetchMock.resetMocks();
  });


  it('should render all risks for the given student when data is loaded', async () => {

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockRisks),
      });

    const { getByText } = render(
        <AuthContext.Provider value={{url:url}}><AllRisks route={mockRoute} navigation={navigation} /></AuthContext.Provider>
    );
    await waitFor(() => {
        expect(getByText('All Student Risks:')).toBeDefined();
        expect(getByText(`${mockRisks[0].student_name}`)).toBeDefined();
        expect(getByText('Tap a lab to send a message regarding a specific risk')).toBeDefined();
    })



  });

  it('should navigate to SendNew screen when a lab is tapped', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockRisks),
      });

    const { getByText } = render(
        <AuthContext.Provider value={{url:url}}><AllRisks route={mockRoute} navigation={navigation} /></AuthContext.Provider>
    );
    await waitFor(() => {
        expect(getByText('All Student Risks:')).toBeDefined();
        expect(getByText(`${mockRisks[0].student_name}`)).toBeDefined();
        expect(getByText('Tap a lab to send a message regarding a specific risk')).toBeDefined();
    })

    fireEvent.press(getByText(`${mockRisks[0].course_name} : lab ${mockRisks[0].lab_number}`));

    expect(navigation.navigate).toHaveBeenCalledWith('SendNew', {
      receiver_id: '1',
      lab: mockRisks[0],
    });
  });
});
