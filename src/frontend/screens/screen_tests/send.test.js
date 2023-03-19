import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Send from '../send';
import AuthContext from '../../utils/auth_context';
import fetchMock from 'jest-fetch-mock';
import { Alert } from 'react-native';

beforeEach(() => {
  fetchMock.resetMocks();
});


const mockAuth = {
    user :{ user_id: 1, is_staff: false },
    updateMessages :jest.fn(),
    updateCourses : jest.fn(),
    url : 'http://example.com',
}

let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));

const mockMessage = 
    {
        "related_lab": "Test Lab",
        "sender_id": 12345,
        "receiver_id": 67890,
        "message_content": "Hey, did you get the lab report I sent earlier today?",
        "sent_at": "2023-03-18 14:30:00"
        
    }


describe('Send component', () => {
  it('renders correctly', () => {
    const route = {
        params: {
          message: {item: mockMessage}
        },
      };
    const { getByText, getByPlaceholderText } = render(<AuthContext.Provider value={mockAuth}><Send route={route} /></AuthContext.Provider>);
    expect(getByText('Reply below')).toBeTruthy();
    expect(getByText('Send')).toBeTruthy();
  });

  it('displays a related lab if pastMessage has a related_lab property', () => {
    const past = 
    {
        "related_lab": "Test Lab",
        "sender_id": 12345,
        "receiver_id": 67890,
        "message_content": "Hey, did you get the lab report I sent earlier today?",
        "sent_at": "2023-03-18 14:30:00",
        "related_lab": true,
        "related_lab_title": 'Related Lab Title',
        "related_lab_course_title": 'Related Lab Course Title',
        
    }
    const route = {
      params: {
        message: {item: past}
      },
    };
    const { getByText } = render(<AuthContext.Provider value={mockAuth}><Send route={route} /></AuthContext.Provider>);
    expect(getByText(`Related to ${past.related_lab_title}(${past.related_lab_course_title}) `)).toBeTruthy();
  });

  it('displays a tutor if pastMessage has a staff property', () => {
    const route = {
      params: {
        message: {
          item: {
            "staff": true,
            "sender_f_name": 'Tutor',
            "related_lab": "Test Lab",
            "sender_id": 12345,
            "receiver_id": 67890,
            "message_content": "Hey, did you get the lab report I sent earlier today?",
            "sent_at": "2023-03-18 14:30:00",
            "related_lab": true,
            "related_lab_title": 'Related Lab Title',
            "related_lab_course_title": 'Related Lab Course Title',

          },
        },
      },
    };
    const { getAllByText } = render(<AuthContext.Provider value={mockAuth}><Send route={route} /></AuthContext.Provider>);
    expect(getAllByText('Tutor')[0]).toBeTruthy();
  });

  it('sends a message when the send button is pressed', async () => {
    const route = {
        params: {
          message: {
            item: {
              "staff": true,
              "sender_f_name": 'Tutor',
              "related_lab": "Test Lab",
              "sender_id": 12345,
              "receiver_id": 67890,
              "message_content": "Hey, did you get the lab report I sent earlier today?",
              "sent_at": "2023-03-18 14:30:00",
              "related_lab": true,
              "related_lab_title": 'Related Lab Title',
              "related_lab_course_title": 'Related Lab Course Title',
  
            },
          },
        },
      };

    const mockNavigation = {
      navigate: jest.fn(),
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve({ok}),
    });

    const { getByText, getByPlaceholderText } = render(<AuthContext.Provider value={mockAuth}><Send route={route} navigation={mockNavigation}/></AuthContext.Provider>);
    fireEvent.changeText(getByPlaceholderText('Type your message here...'), 'test message');
    fireEvent.press(getByText('Send'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Messages');
  });

  it('displays an alert when a message is sent successfully', async () => {
    const route = {
        params: {
          message: {
            item: {
              "staff": true,
              "sender_f_name": 'Tutor',
              "related_lab": "Test Lab",
              "sender_id": 12345,
              "receiver_id": 67890,
              "message_content": "Hey, did you get the lab report I sent earlier today?",
              "sent_at": "2023-03-18 14:30:00",
              "related_lab": true,
              "related_lab_title": 'Related Lab Title',
              "related_lab_course_title": 'Related Lab Course Title',
  
            },
          },
        },
    }
    const mockNavigation = {
      navigate: jest.fn(),
    };
    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve({ok}),
    });

    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { getByText, getByPlaceholderText } = render(<AuthContext.Provider value={mockAuth}><Send route={route} navigation={mockNavigation}/></AuthContext.Provider>);
    fireEvent.changeText(getByPlaceholderText('Type your message here...'), 'test message');
    fireEvent.press(getByText('Send'));

    await expect(alertSpy).toHaveBeenCalledWith(
        'Message sent!'
      );
  });
});
