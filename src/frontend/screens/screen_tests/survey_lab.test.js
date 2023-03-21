import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SurveyLab from '../survey_lab';

const labDetail = {
    lab: {
      lab_number: 1,
      lab_title: "Introduction to React Native"
    }
  };
  
  const questions = {
    questions: [
      [
        {
          x: {pos: "Very Confident", neg: "Not Confident"},
          y: {pos: "Very Easy", neg: "Very Hard"}
        }
      ],
      [
        {
          x: {pos: "Very Enjoyable", neg: "Not Enjoyable"},
          y: {pos: "Very Easy", neg: "Very Hard"}
        }
      ],
      [
        {
          x: {pos: "Very Useful", neg: "Not Useful"},
          y: {pos: "Very Easy", neg: "Very Hard"}
        }
      ]
    ]
  };
  
  const response = [];
  
  const survey = {
    course_id: "CS101",
    tutor_id: "T01",
    student_id: "S123"
  };
  
  const tutorDetail = {
    tutor_name: "John Doe",
    tutor_email: "johndoe@example.com"
  };
  
  const courseDetail = {
    course_name: "Intro to Computer Science",
    course_code: "CS101",
    course_instructor: "Dr. Jane Smith"
  };
  
  let routeParams = { params:{
    labDetail: labDetail,
    question: 1,
    questions: questions,
    response: response,
    survey: survey,
    tutorDetail: tutorDetail,
    courseDetail: courseDetail
  }
  };
  
describe('SurveyLab', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SurveyLab route ={routeParams}/>);
    expect(getByText(`Survey for lab ${routeParams.params.labDetail.lab.lab_number}`)).not.toBeNull();
    expect(getByText('This is question 1/3')).not.toBeNull();
  });

  it('handles onPressForward correctly when question < 3', async () => {
    const navigation = { navigate: jest.fn() };
    const { getByTestId,getAllByTestId } = render(<SurveyLab navigation={navigation} route={routeParams} />);

    // Render a cell and simulate a press

    fireEvent.press(getAllByTestId('cell')[0])
    fireEvent.press(getByTestId('next-button'));
    await waitFor(()=>{
        expect(navigation.navigate).toHaveBeenCalledWith('SurveyLab', expect.objectContaining({ question: 2 }));
    })

  });

  it('handles onPressForward correctly when question = 3',async () => {
    const navigation = { navigate: jest.fn() };
    routeParams.params.question = 3
    const { getByTestId,getAllByTestId } = render(<SurveyLab navigation={navigation} route={routeParams}/>);

    fireEvent.press(getAllByTestId('cell')[0])
    fireEvent.press(getByTestId('next-button'));
    await waitFor(()=>{
        expect(navigation.navigate).toHaveBeenCalledWith('Done',expect.anything());
    })

  });

  it('handles onPressBack correctly when question > 1 and response is not empty', async () => {
    const navigation = { navigate: jest.fn() };
    routeParams.params.response=[1,1]
    routeParams.params.question = 2
    const { getByTestId } = render(<SurveyLab navigation={navigation} route = {routeParams} />);
    fireEvent.press(getByTestId('back-button'));
    await waitFor(()=>{
    expect(navigation.navigate).toHaveBeenCalledWith('SurveyLab', expect.objectContaining({ question: 1 }));
    expect(navigation.navigate).toHaveBeenCalledWith('SurveyLab', expect.objectContaining({ response: [1] }));
    })
  });

  it('handles onPressBack correctly when question > 1 and response is empty', () => {
    const navigation = { navigate: jest.fn() };
    routeParams.params.question = 2
    routeParams.params.response = [1]
    const { getByTestId } = render(<SurveyLab navigation={navigation} route={routeParams} />);
    fireEvent.press(getByTestId('back-button'));
    expect(navigation.navigate).toHaveBeenCalledWith('SurveyLab', expect.objectContaining({ question: 1 }));
    expect(navigation.navigate).toHaveBeenCalledWith('SurveyLab', expect.objectContaining({ response: [1] }));
  });
});
