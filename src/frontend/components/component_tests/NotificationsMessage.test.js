import React from 'react';
import { render, fireEvent,act } from '@testing-library/react-native';
import { NotificationsMessage } from '../NotificationsMessage';

describe('NotificationsMessage component', () => {
  const mockUser = {
    last_login: '2022-03-16 10:00:00.000',
  };

  const mockMessages = [
    {
      id: 1,
      sender_f_name: 'John',
      staff: true,
      sent_at: '2022-03-17 12:00:00.000',
      message: 'Hello',
    },
    {
      id: 2,
      sender_f_name: 'Jane',
      staff: false,
      sent_at: '2022-03-17 15:00:00.000',
      message: 'Hi',
    },
  ];

  it('should render loading indicator while loading or no messages passed from auth', () => {
    const { getByTestId } = render(<NotificationsMessage user={mockUser}/>);
    expect(getByTestId("loading-indicator")).toBeDefined();
  });
});
