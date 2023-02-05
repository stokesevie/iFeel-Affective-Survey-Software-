import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import StyledComponentsNative from 'styled-components/native';

import { ContentJustifiedBack, PageTitle, StyledButton, StyledButtonText } from '../components/styles';

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
        const surveyUrl = `http://127.0.0.1:8000/survey/`+ lab.lab_number  
        const survey_response = await fetch(surveyUrl, {
            method : 'GET',
            headers :{
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
        })
        let body = await survey_response.json()
        .then(async (data) =>{
            for (let i = 1; i < 4; i++){
                let question = await fetchQuestion(data["question_" + i.toString()])
                setQuestions(current => [...current, question]);
                
                
        }})
        .catch(console.error)


        setLoading(false)

        
    })

    const fetchQuestion = (async (question)=>{
        const questionUrl = `http://127.0.0.1:8000/question/`+ question
        const question_response = await fetch(questionUrl, {
            method : 'GET',
            headers :{
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
        })
        let body = await question_response.json()
        alert(JSON.stringify(body))
        return body
    })

    useEffect(()=>{
        fetchSurvey()
        .catch(console.error)
    },[])
    
    if (!loading){
        alert(JSON.stringify(questions))
        return (
            <View>
                <ContentJustifiedBack>
                    <PageTitle>Survey for lab {lab.lab_number}</PageTitle>  
                    <StyledButton title = "Start" onPress = {()=>(
                        navigation.navigate("SurveyLab", {labDetail: {lab}, question :1, questions:{questions}, response:[]})
                    )}><StyledButtonText>Start Survey</StyledButtonText></StyledButton>
              
                </ContentJustifiedBack>
            </View>
        )

    }
   
};
export default Survey;