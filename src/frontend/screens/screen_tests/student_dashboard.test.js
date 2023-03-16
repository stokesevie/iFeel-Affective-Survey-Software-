/* import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import AuthContext from '../../utils/auth_context';
import StudentDashboard from '../dashboard_student';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('StudentDashboard', () => {
  const user = {"user_id":4,"username":"2333030s","is_staff":false,"email":"2333030s@student.gla.ac.uk","first_name":"Evie","last_name":"Student","last_login":"2023-03-16 19:33:47.983684"};
  const courses = [
    {"course_id": "COMPSCI1016", "flag": true, "id": 2, "student_id": 4, "tutor": {"tutor_id": 1, "tutor_name": "Evie Stokes", "tutor_teaching": 3}}
  ];
  const messages = [
    {"id": 30, "message_content": "FLAGGED in Introduction to Computational Thinking: You found this lab very challenging. Would you like to discuss this next week?", "receiver_id": "2333030s", "s_id": 1, "sender_f_name": "Evie", "sender_id": "2444030s", "sender_l_name": "Stokes", "sent_at": "2023-03-13 20:57:46", "staff": true}
  ];

  const navigation = {
    navigate: jest.fn(),
  };

  let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));
    
  it('renders the dashboard when loading is false', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ user, courses, messages }}>
        <StudentDashboard navigation={navigation} />
      </AuthContext.Provider>
    );
    expect(getByText('Home')).toBeDefined();
    expect(getByText(`Welcome, ${user.first_name}!`)).toBeDefined();
    expect(getByText('NotificationsSurvey')).toBeDefined();
    expect(getByText('NotificationsAlert')).toBeDefined();
    expect(getByText('NotificationsMessage')).toBeDefined();
  });

  it('renders a loading spinner when loading is true', () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={{ user, courses, messages }}>
        <StudentDashboard navigation={navigation} />
      </AuthContext.Provider>,
    );

    expect(getByTestId('loading-spinner')).toBeDefined();
  });

  it('displays an error message if courses are not found', async () => {
    const noCourses = [];
    const { getByText } = render(
      <AuthContext.Provider value={{ user, courses: noCourses, messages }}>
        <StudentDashboard navigation={navigation} />
      </AuthContext.Provider>,
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getByText('No courses found')).toBeDefined();
  });
});
 */