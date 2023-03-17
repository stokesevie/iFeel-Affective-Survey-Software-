import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Courses from '../courses';
import AuthContext from '../../utils/auth_context';
import fetchMock from 'jest-fetch-mock'

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

describe('Courses', () => {
  it('renders loading indicator when courses are not loaded', async () => {

    const { getByTestId } = render(<AuthContext.Provider value ={{user :user, courses:[]}}><Courses /></AuthContext.Provider>);

    const loadingIndicator = getByTestId('loading-indicator');

    expect(loadingIndicator).toBeTruthy();
  });


});
