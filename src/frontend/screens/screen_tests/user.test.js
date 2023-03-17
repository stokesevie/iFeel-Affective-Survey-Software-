import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import User from '../user';
import AuthContext from '../../utils/auth_context';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));

const mockSetAuthTokens = jest.fn();
const mockSetUser = jest.fn();
const mockClearLocalStorage = jest.fn();
const navigation = { navigate: jest.fn() };
const user ={
    is_staff: false,
    user_id: '1',
    first_name: 'John',
    last_name: 'Doe',
  }
const url = 'http://example.com'

describe('User screen', () => {
  test('renders student details correctly', async () => {

    const student = {
      level: 5,
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(student),
      });

    const { getByText, getByTestId } = render(
        <AuthContext.Provider value={{user: user, setAuthTokens:mockSetAuthTokens,setUser:mockSetUser,url:url}}><User navigation={navigation}/></AuthContext.Provider>);
    await waitFor(() => expect(getByText('Student Home')).toBeTruthy());
    expect(getByText(`${user.first_name} ${user.last_name} ${`\n`}Level: ${student.level}${`\n`}`)).toBeTruthy();
    fireEvent.press(getByTestId('logout-button'));
    expect(mockSetAuthTokens).toHaveBeenCalledWith(null);
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  test('displays error message when unable to fetch student details', async () => {
    let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

    localStorage.setItem("authTokens", JSON.stringify(data));

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve(false),
      });

    const { getByText, getByTestId } = render(
        <AuthContext.Provider value={{user: user, setAuthTokens:mockSetAuthTokens,setUser:mockSetUser,url:url}}><User navigation={navigation}/></AuthContext.Provider>);

    await waitFor(() => expect(getByText('Student Home')).toBeTruthy());
    expect(getByText('Issue finding details of student status, contact system administrator')).toBeTruthy();
    fireEvent.press(getByTestId('logout-button'));
    expect(mockSetAuthTokens).toHaveBeenCalledWith(null);
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  test('renders tutor profile correctly', async () => {
    let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

    localStorage.setItem("authTokens", JSON.stringify(data));

    const user = {
      is_staff: true,
    };

    const { getByText, getByTestId } = render(<AuthContext.Provider value={{user: user, setAuthTokens:mockSetAuthTokens,setUser:mockSetUser,url:url}}><User navigation={navigation}/></AuthContext.Provider>);
    await waitFor(() => expect(getByText('Tutor Profile')).toBeTruthy());
    fireEvent.press(getByTestId('logout-button'));
    expect(mockSetAuthTokens).toHaveBeenCalledWith(null);
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  
});
