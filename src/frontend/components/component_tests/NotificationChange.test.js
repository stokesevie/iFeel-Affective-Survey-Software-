import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NotificationChange } from '../NotificationChange';

describe('NotificationChange', () => {
  it('renders without crashing', () => {
    render(<NotificationChange user={{}} courses={[]} />);
  });

  it('displays a message when there are no courses', () => {
    const { getByText } = render(<NotificationChange user={{}} courses={[]} />);
    expect(getByText('You cannot edit any surveys')).toBeDefined();
  });

  it('displays course information when a course is provided', () => {
    const course = {
      course_title: 'Test Course',
      lab: { lab_number: 1, lab_title: 'Test Lab' },
    };
    const { getByText } = render(<NotificationChange user={{}} courses={[[course]]} />);
    expect(getByText(`Edit ${course.course_title} surveys?`)).toBeDefined();
    expect(getByText(`Lab ${course.lab.lab_number}`)).toBeDefined();
    expect(getByText(`titled ${course.lab.lab_title}`)).toBeDefined();
  });
});
