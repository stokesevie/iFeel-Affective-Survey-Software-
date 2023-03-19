import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthContext from '../../utils/auth_context';
import SendNew from '../new_message'

let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));

describe('SendNew', () => {
  it('should send a message when "Send" button is pressed', async () => {
    // mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    const receiver_id = 2;
    const course = 'Math';

    const mockNavigation = {
        navigate: jest.fn(),
      };
    // render the component
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={{ user: { user_id: 1, is_staff: true}, url: 'http://example.com'}}>
        <SendNew route={{params:{receiver_id,course}}} navigation={mockNavigation} />
      </AuthContext.Provider>
    )

    // type a message into the input field
    const input = getByPlaceholderText('Type your message here');
    fireEvent.changeText(input, 'Hello, world!');

    // press the "Send" button
    const sendButton = getByText('Send');
    Date.now = jest.fn().mockReturnValue(new Date("2020-05-13 13:33:37+00:00"));
    fireEvent.press(sendButton);

    // wait for the message to be sent
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    await waitFor(()=>expect(fetch).toHaveBeenCalledWith('http://example.com/messages/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: 1,
        receiver_id: 2,
        message_content: "FLAGGED in Math: Hello, world!",
        sent_at:"2020-05-13 13:33:37+00:00",
      }),
    })
    )
  });
});
