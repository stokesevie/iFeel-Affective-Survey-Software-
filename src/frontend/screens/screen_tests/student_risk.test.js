import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';
import StudentRisk from '../student_risk';
import AuthContext from '../../utils/auth_context';
import fetchMock from 'jest-fetch-mock';
import { Alert } from 'react-native';

beforeEach(() => {
  fetchMock.resetMocks();
});


let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));

// Mock navigation object
const navigation = {
  navigate: jest.fn(),
};

// Mock route object
const route = {
  params: {
    relatedRisks: [
      { student_id: 1, student_first_name: 'John', student_last_name: 'Doe', lab_title: 'Lab 1', risk: true, axis_neg: 'Axis 1' },
      { student_id: 1, student_first_name: 'John', student_last_name: 'Doe', lab_title: 'Lab 2', warning: true, axis_neg: 'Axis 2' },
    ],
    teaching_id: 1,
    labDetail: { course_title: 'Test' },
  },
};

const mockAuth = {
    user :{ user_id: 1, is_staff: false },
    updateMessages :jest.fn(),
    updateCourses : jest.fn(),
    url : 'http://example.com',
}

describe('StudentRisk component', () => {
  test('renders page title and subtitle', () => {
    const { getByText } = render(<AuthContext.Provider value={mockAuth}><StudentRisk route={route} /></AuthContext.Provider>);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Lab 1 lab risks')).toBeTruthy();
  });

  test('renders flag button', () => {
    const { getByText } = render(<AuthContext.Provider value={mockAuth}><StudentRisk route={route} navigation={navigation}/></AuthContext.Provider>);
    expect(getByText('Flag this student')).toBeTruthy();
  });

  test('renders unflag button when student is already flagged', () => {
    const flaggedRoute = {
      params: {
        relatedRisks: [{ student_id: 1, student_first_name: 'John', student_last_name: 'Doe', flag: true }],
        teaching_id: 1,
        labDetail: { course_title: 'Test' },
      },
    };
    const { getByText } = render(<AuthContext.Provider value={mockAuth}><StudentRisk route={flaggedRoute} /></AuthContext.Provider>);
    expect(getByText('Unflag this student')).toBeTruthy();
  });

  test('unflags student when unflag button is pressed', async () => {
    const flaggedRoute = {
        params: {
          relatedRisks: [{ student_id: 1, student_first_name: 'John', student_last_name: 'Doe', flag: true }],
          teaching_id: 1,
          labDetail: { course_title: 'Test' },
        },
      };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve({}),
    });
    const { getByText } = render(<AuthContext.Provider value={mockAuth}><StudentRisk route={flaggedRoute} navigation={navigation}/></AuthContext.Provider>);
    fireEvent.press(getByText('Unflag this student'));
    await waitFor(()=>{
        expect(navigation.navigate).toHaveBeenCalledWith('TutorDashboard');
    }) 
  });
});
