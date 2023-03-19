import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthContext from '../../utils/auth_context';
import TutorCourses from '../tutor_courses';

// Mock AuthContext data
const authContextData = {
  user: {
    first_name: 'John',
  },
  url: 'https://example.com',
  courses: [
    [
      {
        course_title: 'Math',
        course_id: 'MATH101',
      },
      {
        lab_name: 'Lab 1',
      },
      {
        lab_name: 'Lab 2',
      },
    ],
    [
      {
        course_title: 'Science',
        course_id: 'SCI101',
      },
      {
        lab_name: 'Lab 3',
      },
    ],
  ],
};

describe('TutorCourses', () => {
  it('should display the correct title and list of courses', () => {
    const { getByText, getAllByTestId } = render(
      <AuthContext.Provider value={authContextData}>
        <TutorCourses />
      </AuthContext.Provider>,
    );

    // Check the page title
    expect(getByText(`${authContextData.user.first_name}, you are teaching the following courses:`)).toBeDefined();

    // Check the list of courses
    const courses = authContextData.courses.map((course) => course[0].course_title);
    const courseElements = getAllByTestId('course-title');
    expect(courseElements).toHaveLength(courses.length);
  });

  it('should navigate to TutorCourse when a course is pressed', () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={authContextData}>
        <TutorCourses navigation={{ navigate }} />
      </AuthContext.Provider>,
    );

    // Press the first course in the list
    fireEvent.press(getByText(authContextData.courses[0][0].course_title));

    // Check that the navigate function was called with the correct parameters
    expect(navigate).toHaveBeenCalledWith('TutorCourse', expect.anything())
  });
});
