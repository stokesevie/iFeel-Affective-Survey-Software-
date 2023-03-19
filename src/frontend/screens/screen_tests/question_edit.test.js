import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import QuestionEdit from "../question_edit";

describe("QuestionEdit component", () => {
  const mockRoute = {
    params: {
      question: {
        x: { neg: "Easy", pos: "Hard" },
        y: { neg: "Easy", pos: "Hard" }
      },
      course: "Test",
      questionNumber: 1,
      lab: { lab: { lab_title: "Test Lab", lab_number: 1 } },
      refresh: false
    }
  };
  const mockNavigation = {
    navigate: jest.fn()
  };

  it("renders the correct page title and subtitle", () => {
    const { getByTestId } = render(
      <QuestionEdit route={mockRoute} navigation={mockNavigation} />
    );
    waitFor(()=>{
        expect(getByTestId("page-title").textContent).toBe("Editing Question 1");
        expect(getByTestId("sub-title").textContent).toBe(
          "Test - Test Lab(lab 1)"
        );
    })

  });

  it("renders the correct axis values", () => {
    const { getByTestId } = render(
      <QuestionEdit route={mockRoute} navigation={mockNavigation} />
    );
    waitFor(()=>{
        expect(getByTestId("x").textContent).toBe("0 - 10");
        expect(getByTestId("y").textContent).toBe("1 - 9");
    })
   
  });

  it("navigates to EditAxis screen when Edit Axis button is pressed", () => {
    const { getByTestId } = render(
      <QuestionEdit route={mockRoute} navigation={mockNavigation} />
    );
    fireEvent.press(getByTestId("edit-x"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("EditAxis", {
      question: mockRoute.params.question,
      questionNumber: mockRoute.params.questionNumber,
      lab: mockRoute.params.lab,
      course: mockRoute.params.course,
      axis: "x",
      refresh: mockRoute.params.refresh
    });
    fireEvent.press(getByTestId("edit-y"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("EditAxis", {
      question: mockRoute.params.question,
      questionNumber: mockRoute.params.questionNumber,
      lab: mockRoute.params.lab,
      course: mockRoute.params.course,
      axis: "y",
      refresh: mockRoute.params.refresh
    });
  });

  it("navigates to Demo screen when See Demo button is pressed", () => {
    const { getByTestId } = render(
      <QuestionEdit route={mockRoute} navigation={mockNavigation} />
    );
    fireEvent.press(getByTestId("see-demo"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Demo", {
      question: mockRoute.params.question,
      lab: mockRoute.params.lab,
      questionNumber: mockRoute.params.questionNumber
    });
  });
});
