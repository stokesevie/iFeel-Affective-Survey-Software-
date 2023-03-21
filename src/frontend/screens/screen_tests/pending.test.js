import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Pending from '../pending';
import AuthContext from '../../utils/auth_context';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});


let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));


const mockMessages = [
    {
        "related_lab": "Test Lab",
        "sender_id": 12345,
        "receiver_id": 67890,
        "message_content": "Hey, did you get the lab report I sent earlier today?",
        "sent_at": "2023-03-18 14:30:00"
        
    },
]

const mockCourses = [{"course_id": "COMPSCI1016", "flag": true, "id": 2, "student_id": 4, "tutor": {"tutor_id": 1, "tutor_name": "Evie Stokes", "tutor_teaching": 3}}, {"course_id": "COMPSCI1019", "flag": false, "id": 3, "student_id": 4, "tutor": {"tutor_id": 1, "tutor_name": "Evie Stokes", "tutor_teaching": 4}}, {"course_id": "COMPSCI1018", "flag": false, "id": 4, "student_id": 4, "tutor": {"tutor_id": 1, "tutor_name": "Evie Stokes", "tutor_teaching": 6}}, {"course_id": "COMPSCI1006", "flag": false, "id": 5, "student_id": 4, "tutor": {"tutor_id": 1, "tutor_name": "Evie Stokes", "tutor_teaching": 7}}, {"course_id": "COMPSCI1001", "flag": false, "id": 6, "student_id": 4, "tutor": {"tutor_id": 1, "tutor_name": "Evie Stokes", "tutor_teaching": 8}}, {"course_id": "COMPSCI1021", "flag": false, "id": 7, "student_id": 4, "tutor": {"tutor_id": 1, "tutor_name": "Evie Stokes", "tutor_teaching": 9}}]


const navigation= { navigate: jest.fn() }
const mockAuth = {
    user :{ user_id: 1, is_staff: false },
    updateMessages :jest.fn(),
    updateCourses : jest.fn(),
    url : 'http://example.com',
}


describe('Pending screen', () => {
  it('renders correctly', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockMessages),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockCourses),
    });
    const { getByTestId } = render(<AuthContext.Provider value={mockAuth} ><Pending navigation={navigation}/></AuthContext.Provider>);



  });

  it('shows a spinner when loading', async () => {
    const { getByTestId } = render(<AuthContext.Provider value={mockAuth} ><Pending navigation={navigation}/></AuthContext.Provider>);
    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('navigates to StudentDashboard when user is not staff', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockMessages),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockCourses),
    });
    mockAuth.user.is_staff = false

    render(<AuthContext.Provider value={mockAuth} ><Pending navigation={navigation} /></AuthContext.Provider>);

    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('StudentDashboard'));
    expect(mockAuth.updateMessages).toHaveBeenCalled();
    expect(mockAuth.updateCourses).toHaveBeenCalled();
  });

  it('navigates to TutorDashboard when user is staff', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockMessages),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockCourses),
    });
    mockAuth.user.is_staff = true

    render(<AuthContext.Provider value={mockAuth} ><Pending navigation={navigation} /></AuthContext.Provider>)

    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('TutorDashboard'));
    expect(mockAuth.updateMessages).toHaveBeenCalled();
    expect(mockAuth.updateCourses).toHaveBeenCalled();
  });

  it('navigates to Login when user is not set', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockMessages),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(mockCourses),
    });
    const noUser = {
        user : {},
        updateMessages :jest.fn(),
        updateCourses : jest.fn(),
        url : 'http://example.com',
    }

    render(<AuthContext.Provider value={noUser} ><Pending navigation={navigation} /></AuthContext.Provider>)

    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('Login'));
  });
});
