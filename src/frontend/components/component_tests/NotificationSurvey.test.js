import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { NotificationsSurvey } from '../NotificationsSurvey';
import AuthContext from '../../utils/auth_context'
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));

describe('NotificationsSurvey', () => {
  it('renders a loading indicator when loading is true', async () => {
    const { getByTestId } = render(
    <AuthContext.Provider value={{ url: 'http://example.com' }}>
    <NotificationsSurvey user={{ user_id: '1' }} courses={[{ course_id: '123' }]} />
    </AuthContext.Provider>);
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeDefined();
    expect(loadingIndicator.props.visible).toBeTruthy()
  });

  it('renders a "no surveys" message when there are no surveys to complete', async () => {
    const { getByText } = render(    <AuthContext.Provider value={{ url: 'http://example.com' }}>
    <NotificationsSurvey user={{ user_id: '1' }} courses={[{ course_id: '123' }]} />
    </AuthContext.Provider>);
    await waitFor(() =>
    expect(getByText('No surveys to complete')).toBeDefined()
    );
  });


  it('renders message when there is a survey to complete', async () => {
    const survey = { lab_id: 1, course_id: 1, title: 'Survey 1' };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve([survey]),
    });
    fetchMock.mockReject(()=>Promise.reject("down"))
    
    const { getByText } = render(<AuthContext.Provider value={{ url: 'http://example.com' }}>
    <NotificationsSurvey user={{ user_id: '1' }} courses={[{ course_id: '123' }]} />
    </AuthContext.Provider>);
    await waitFor(() => {
      const surveyText = getByText(/reminder for/i);
      expect(surveyText).toBeTruthy();
    });
  });
  
});
