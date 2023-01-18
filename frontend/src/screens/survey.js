import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import StyledComponentsNative from 'styled-components/native';

import { ContentJustified, PageTitle, StyledButton, StyledButtonText } from '../components/styles';

const Survey = ({route, navigation}) => {
    const { lab } = route.params.lab
    const [questions, setQuestions] = useState([])
    const [survey, setSurvey] = useState([])
    const [loading, setLoading] = useState(true);

    const [count, setCount] = useState(0);
//only update the value of 'count' when component is first mounted
    useEffect(() => {
    setCount((count) => count + 1);
    }, []);

    const fetchSurvey = ( async ()=>{
        const surveyUrl = `http://backend-production-94f0.up.railway.app/survey/`+ lab.lab_id   
        const survey_response = await fetch(surveyUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        let body = await survey_response.json()
        .then(async (data) =>{
            for (let i = 1; i < 4; i++){
                let x = await fetchQuestion(data["question_" + i.toString()+"_x"])
                let y = await fetchQuestion(data["question_" + i.toString()+"_y"])
                let q = {"x": x, "y": y}
                setQuestions(current => [...current, q]);
                
                
        }})
        .catch(console.error)

        
    })

    const fetchQuestion = (async (question)=>{
        const questionUrl = `http://backend-production-94f0.up.railway.app/question/`+ question
        const question_response = await fetch(questionUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        let body = await question_response.json()
        return body
        
    })

    useEffect(()=>{
        fetchSurvey()
        .catch(console.error)
    },[])
    

    return (
        <View>
            <ContentJustified>
                <PageTitle>Survey for {lab.lab_id}</PageTitle>  
                <StyledButton title = "Start" onPress = {()=>(
                    navigation.navigate("SurveyLab", {labDetail: {lab}, question :1, questions:{questions}})
                )}><StyledButtonText>Start Survey</StyledButtonText></StyledButton>
          
            </ContentJustified>
        </View>
    )
};
export default Survey;