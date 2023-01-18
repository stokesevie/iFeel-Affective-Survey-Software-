import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { XYGrid, XMin, YMin, XYGridText, YTextMin, Grid, YText, SurveyQuestion, StyledButtonText } from '../components/styles';

import { ContentJustified, PageTitle, StyledButton } from '../components/styles';

const SurveyLab = ({route, navigation}) => {
    const { labDetail, question, questions } = route.params
    const lab = labDetail.lab
    const q = questions.questions[question-1]
    const x = q.x[0]
    const y = q.y[0]

    const onPressForward = ()=>{
        if (question>=3){
            navigation.navigate("Done",{
                lab : {lab}
            })
        }else{

            navigation.navigate("SurveyLab", {
                labDetail: {lab}, 
                question :question+1,
                questions : questions
            })
        }
    }

    const onPressBack = ()=>{
        if (question<=1){
            navigation.navigate("StudentDashboard")
        }else{

            navigation.navigate("SurveyLab", {
                labDetail: {lab}, 
                question :question-1,
                questions : questions
            })
        }
    }
        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey for lab {lab.lab_id}</PageTitle>
                    <SurveyQuestion>This is question {question}/3</SurveyQuestion>  
                    <XYGrid>
                        <XMin>
                            <XYGridText>{x.pos_title}</XYGridText> 
                        </XMin>
                            <YMin><YTextMin >{y.pos_title}</YTextMin>
                        <Grid></Grid>
                        <YText> {y.neg_title} </YText>
                        
                        </YMin>
    
                        <XYGridText>{x.neg_title}</XYGridText>
    
                    </XYGrid>
                    <StyledButton title = "next" onPress={onPressForward}><StyledButtonText> Next </StyledButtonText></StyledButton>
                    <StyledButton title = "back" onPress={onPressBack}><StyledButtonText> Back </StyledButtonText></StyledButton>
              
                </ContentJustified>
            </View>
        )
    
};



export default SurveyLab;