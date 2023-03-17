import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AuthContext from '../../utils/auth_context';
import fetchMock from 'jest-fetch-mock';

import Course from '../course';

beforeEach(() => {
    fetchMock.resetMocks();
  });
  
  let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}
  
  localStorage.setItem("authTokens", JSON.stringify(data));

  const user ={
    is_staff: false,
    user_id: '1',
    first_name: 'John',
    last_name: 'Doe',
  }
const url = 'http://example.com'

describe('Course', () => {
  it('renders without errors', async () => {
    const route = { params: { course: { id: '1', title: 'Test Course' }, courseDetail: {}, tutor: {} } };
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<AuthContext.Provider value ={{user :user, url: url}}><Course route={route} navigation={navigation} /></AuthContext.Provider>);

    await waitFor(() => {
      expect(getByText('Test Course Labs:')).toBeDefined();
    });
  });

  it('renders message when no labs are enrolled', async () => {
    const route = { params: { course: { id: '1', title: 'Test Course' }, courseDetail: {}, tutor: {} } };
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<AuthContext.Provider value ={{user :user, url: url}}><Course route={route} navigation={navigation} /></AuthContext.Provider>);

    await waitFor(() => {
      expect(getByText('You are not yet enrolled in any labs for this course.')).toBeDefined();
    });
  });

  it('renders labs list when labs are present', async () => {
    const route = { params: { course: { id: '1', title: 'Test Course' }, courseDetail: {}, tutor: {} } };
    const navigation = { navigate: jest.fn() };
    const labItem =  {
        lab_id: 1,
        title: 'Lab 1',
        description: 'This is lab 1',
      }
    

    global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            lab_id: 1,
            title: 'Lab 1',
            description: 'This is lab 1',
          },
          {
            lab_id: 2,
            title: 'Lab 2',
            description: 'This is lab 2',
          },
        ]),
    })
  );
  const {getByText}= render(<AuthContext.Provider value ={{user :user, url: url}}><Course route={route} navigation={navigation} /></AuthContext.Provider>);
    await waitFor(() => {

      expect(getByText(`${route.params.course.title} Labs:`)).toBeDefined();
      expect(getByText(`${labItem.title}`)).toBeDefined();
    });
  });
})