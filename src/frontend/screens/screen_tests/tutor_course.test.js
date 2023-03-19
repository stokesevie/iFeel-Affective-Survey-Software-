import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TutorCourse from '../tutor_course';

describe('TutorCourse', () => {
  const params ={"course": "Introduction to Computational Thinking", "labs": [{"course_id": "COMPSCI1016", "course_title": "Introduction to Computational Thinking", "lab": {"help": "https://obkio.com/blog/network-testing/", "lab_date": "2023-03-13", "lab_id": 5, "lab_number": 1, "lab_title": "Introduction to Programming"}, "tutor_teaching_id": 3, "tutor_user_id": 1}, {"course_id": "COMPSCI1016", "course_title": "Introduction to Computational Thinking", "lab":{"help": "", "lab_date": "2023-03-06", "lab_id": 6, "lab_number": 2, "lab_title": "Algorithms and Data Structures"}, "tutor_teaching_id": 3, "tutor_user_id": 1}, ]}
 
  it('renders course title', () => {
    const { getByText } = render(<TutorCourse route={{ params: params }} />);
    expect(getByText(`${params.course} labs you teach:`)).toBeDefined();
  });

  it('renders lab items', () => {
    const { getByText } = render(<TutorCourse route={{ params: params }} />);
    expect(getByText(`${params.labs[0].lab.lab_title}`)).toBeDefined()
  });

});
