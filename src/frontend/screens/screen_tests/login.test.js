import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from '../login'
import AuthContext from "../../utils/auth_context";
import { Alert } from "react-native";
import { useContext } from "react";

describe("Login page", () => {
    const navigation = { navigate: jest.fn() };
    const loginUser = jest.fn()
    test("renders correctly", () => {
        const { getByText, getByPlaceholderText } = render(
            <AuthContext.Provider value={{ loginUser }}>
              <Login navigation={navigation} />
            </AuthContext.Provider>
          );
            expect(getByText("Login")).toBeTruthy();
            expect(getByPlaceholderText("1234567a")).toBeTruthy();
            expect(getByPlaceholderText("Password")).toBeTruthy();
            expect(getByText("Log in")).toBeTruthy();

  });

  test('calls Alert when Log in button is pressed with incomplete fields', () => {
    const alertMock = jest.spyOn(Alert, 'alert');
    const navigation = { navigate: jest.fn() };
    const { getByText } = render( <AuthContext.Provider value={{ loginUser }}>
        <Login navigation={navigation} />
      </AuthContext.Provider>);
    const loginButton = getByText('Log in');
    fireEvent.press(loginButton);
    expect(alertMock).toHaveBeenCalledWith('Log in incomplete', 'Please enter username AND password');
  });

  test("handles submit correctly with valid credentials", async () => {
    const navigation = { navigate: jest.fn() };
    const loginUser = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ loginUser }}>
        <Login navigation={navigation} />
      </AuthContext.Provider>
    );
    fireEvent.changeText(getByPlaceholderText("1234567a"), "testuserstudent");
    fireEvent.changeText(getByPlaceholderText("Password"), "testpassword");
    fireEvent.press(getByText("Log in"));
    await expect(loginUser).toHaveBeenCalledWith(
      "testuserstudent",
      "testpassword",
      navigation
    );
    
    expect(getByPlaceholderText("1234567a").props.value).toEqual("");
    expect(getByPlaceholderText("Password").props.value).toEqual("");
  });

  test("handles submit correctly with empty fields", async () => {
    const navigation = { navigate: jest.fn() };
    const loginUser = jest.fn();
    const alert = jest.spyOn(Alert, "alert");
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ loginUser }}>
        <Login navigation={navigation} />
      </AuthContext.Provider>
    );
    fireEvent.press(getByText("Log in"));
    expect(alert).toHaveBeenCalledWith(
      "Log in incomplete",
      "Please enter username AND password"
    );
    expect(loginUser).not.toHaveBeenCalled();
    expect(getByPlaceholderText("1234567a").props.value).toEqual("");
    expect(getByPlaceholderText("Password").props.value).toEqual("");
  });


});
