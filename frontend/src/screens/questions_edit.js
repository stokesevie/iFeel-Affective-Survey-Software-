import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import AuthContext from '../utils/auth_context';


import { BubbleText, BubbleTextBold, CenterText, ContentJustifiedBack, CourseDetail, PageTitle, AxisListButton, SubTitle } from '../components/styles';
import StyledLabTutor from '../components/StyledLabTutor';

const QuestionsEdit = ({route,navigation}) => { 
    const { user } = useContext(AuthContext);
    const  lab  = route.params.lab.lab
    const  course  = route.params.course.course
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    const access = JSON.parse(localStorage.getItem("authTokens"))['access']

    const getSurvey = async ()=>{
        const surveyUrl = `http://127.0.0.1:8000/survey/`+lab.lab_id +`/`
        let response = await fetch(surveyUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
        })
        let s = await response.json().catch(error=>{})
        for (let q=1;q<4;q++){
            let question = await getQuestion(s['question_'+q])
            if (question){
                setQuestions(current => [...current, question]);
            }
        }
        setLoading(false)
    }

    useEffect(()=>{
        if (loading){
            getSurvey()
        }
    },[loading])

    const getQuestion = async(question_id)=>{
        const questionsUrl = `http://127.0.0.1:8000/question/`+question_id +`/`
        let response = await fetch(questionsUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
        })
        let q = await response.json().catch(error=>{})
        return q
    }



    if (!loading){
        return (
                <ContentJustifiedBack>
                    <PageTitle>Make Survey Changes:</PageTitle>  
                    <SubTitle>{course}: Lab {lab.lab_title} (lab {lab.lab_number})</SubTitle>
                    <SubTitle>Select question to change:</SubTitle>
                    <FlatList
                    data = {[0,1,2]}
                    renderItem={({item})=>{
                        let question = questions[item][0]
                        return (<AxisListButton onPress={()=>{}}><CenterText><BubbleTextBold>Question {item+1}{`\n`}</BubbleTextBold>
                        <CourseDetail>Axis currently selected:{`\n`}</CourseDetail>
                        <CourseDetail>x: </CourseDetail><BubbleText>{question.x.neg} - {question.x.pos}{`\n`}</BubbleText>
                        <CourseDetail>y: </CourseDetail><BubbleText>{question.y.neg} - {question.y.pos}</BubbleText>
                        </CenterText></AxisListButton>)
                    }}/>
                </ContentJustifiedBack>
        )
    }
   
};
export default QuestionsEdit;
