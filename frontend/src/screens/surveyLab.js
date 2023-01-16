import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { XYGrid, XMin, YMin, XYGridText, YTextMin, Grid, YText, SurveyQuestion, StyledButtonText } from '../components/styles';

import { ContentJustified, PageTitle, StyledButton } from '../components/styles';

const SurveyLab = ({route, navigation}) => {
    const { labDetail, question, questions } = route.params
    const lab = labDetail.lab
    const thisQuestion = questions.questions[0][question-1]

    const onPress = ()=>{
        if (question>=3){
            navigation.navigate("Done")
        }else{
            alert(JSON.stringify(questions))
            navigation.navigate("SurveyLab", {
                labDetail: {lab}, 
                question :question+1,
                questions : {questions}
            })
        }
    }
    alert(JSON.stringify(questions))
        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey for lab {lab.lab_id}</PageTitle>
                    <SurveyQuestion>This is the question {question}</SurveyQuestion>  
                    <XYGrid>
                        <XMin>
                            <XYGridText>{thisQuestion.warn}</XYGridText> 
                        </XMin>
                            <YMin><YTextMin >Y Label Min</YTextMin>
                        <Grid></Grid>
                        <YText> Y Label Max </YText>
                        
                        </YMin>
    
                        <XYGridText>X Label Min</XYGridText>
    
                    </XYGrid>
                    <View style = {styles.container}/>
                    <StyledButton title = "next" onPress={onPress}><StyledButtonText> Next </StyledButtonText></StyledButton>
              
                </ContentJustified>
            </View>
        )
    
};

const styles = StyleSheet.create({
    container: {
      padding: 24,
    },
})

export default SurveyLab;