import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import NewAxis from '../new_axis';
import AuthContext from '../../utils/auth_context';
import { Alert } from 'react-native';

// Mock AuthContext value
const authContext = {
  url: 'https://example.com',
};
let data ={'access':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNTg4MDM0LCJpYXQiOjE2Nzg5OTYwMzQsImp0aSI6IjcxMDAyM2Y4NWZjYzQwZTJhMzlmMDU0MWNmYjgyYzMzIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiIyMzMzMDMwcyIsImlzX3N0YWZmIjpmYWxzZSwiZW1haWwiOiIyMzMzMDMwc0BzdHVkZW50LmdsYS5hYy51ayIsImZpcnN0X25hbWUiOiJFdmllIiwibGFzdF9uYW1lIjoiU3R1ZGVudCIsImxhc3RfbG9naW4iOiIyMDIzLTAzLTE2IDE5OjM1OjI4LjQ5MTAxNiJ9.uzsRMLQsXjMzLWGoRTLCoeuhlFgEjwPPI67zmNpD3Lc'}

localStorage.setItem("authTokens", JSON.stringify(data));

describe('NewAxis', () => {
  it('renders correctly', async () => {
    const route = {
      params: {
        lab: 'lab1',
        course: 'course1',
        axis: 'x',
        questionNumber: 1,
      },
    };

    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={authContext}>
        <NewAxis route={route} />
      </AuthContext.Provider>
    );

    expect(getByText('Create new axis')).toBeDefined();
    expect(getByPlaceholderText('Positive axis title')).toBeDefined();
    expect(getByPlaceholderText('Negative axis title')).toBeDefined();
    expect(getByText('Risk zone:')).toBeDefined();
    expect(getByText('Warning zone:')).toBeDefined();
  });

  it('displays an alert if the risk zone is less than the warning zone', async () => {
    const route = {
      params: {
        lab: 'lab1',
        course: 'course1',
        axis: 'x',
        questionNumber: 1,
      },
    };

    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={authContext}>
        <NewAxis route={route} />
      </AuthContext.Provider>
    );

    const posAxisInput = getByPlaceholderText('Positive axis title');
    const negAxisInput = getByPlaceholderText('Negative axis title');
    const riskZoneInput = getByPlaceholderText('Risk');
    const warningZoneInput = getByPlaceholderText('Warning');
    const doneButton = getByText('Save');

    await act(async () => {
       fireEvent.changeText(posAxisInput, 'Positive axis');
       fireEvent.changeText(negAxisInput, 'Negative axis');
       fireEvent.changeText(riskZoneInput, '5');
       fireEvent.changeText(warningZoneInput, '8');

    });

    fireEvent.press(doneButton);


    expect(alertSpy).toHaveBeenCalledWith(
      "Zones must be a number from 1-10, with warning zone being less than risk zone."
    );
  });

});