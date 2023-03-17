import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View} from 'react-native'
import { XYGrid, XYGridText, YTextMin, Grid, YText, SurveyQuestion, StyledButtonText,Cell } from '../components/styles';
import { Alert } from 'react-native';
import { ContentJustified, PageTitle, StyledButton } from '../components/styles';


/*
This is the grid used for the survey
*/ 

const SurveyLab = ({route, navigation}) => {
    const { labDetail, question, questions,response,survey,tutorDetail,courseDetail } = route.params
    const lab = labDetail.lab
    const q = questions.questions[question-1][0]
    const [colour, setColour] = useState(-1)
    const [pressed, setPressed] = useState(false)
    const [loading,setLoading] = useState(false)

    const onPressForward = ()=>{
        if (pressed){
            if (question>=3){
                navigation.navigate("Done",{
                    lab : {lab},
                    response :response,
                    questions: questions,
                    survey:survey,
                    tutorDetail:tutorDetail,
                    courseDetail:courseDetail
                })
            }else{
                setPressed(false)
                setColour(-1)
                navigation.navigate("SurveyLab", {
                    labDetail: {lab}, 
                    question :question+1,
                    questions : questions,
                    response:response,
                    survey:survey,
                    tutorDetail:tutorDetail,
                    courseDetail:courseDetail
                    
                })
            }
    }else{
        Alert.alert("You must answer this question", "To move to next survey question, this question must be answered")
    }
    }

    const onPressBack = ()=>{
        if (question<=1){
            navigation.navigate("StudentDashboard")
        }else{
            if (response.length>0){
                navigation.navigate("SurveyLab", {
                    labDetail: {lab}, 
                    question :question-1,
                    questions : questions,
                    response:response.splice(-1),
                    survey:survey,
                    tutorDetail:tutorDetail,
                    courseDetail:courseDetail
                })
            }else{
                navigation.navigate("SurveyLab", {
                    labDetail: {lab}, 
                    question :question-1,
                    questions : questions,
                    response:response,
                    survey:survey,
                    tutorDetail:tutorDetail,
                    courseDetail:courseDetail
                })
            }
        }
    }



    const renderGrid = (i)=>{
        let c;
        if (colour==i.index){
            c = 'red'
        }else{
            c = 'transparent'
        }
        return (
        <Cell onPress={(c)=>{
            setColour([i.index])
            if (pressed){
                response.pop()
                response.push(i.item)
            }else {
                setPressed(true)
                response.push(i.item)
            }
        }} >
            <Text style = {{color: c}}>X</Text>
        </Cell>)
    }


    if (!loading){

    let grid = []

    for (let y = 0; y<=9;y++){
        for (let x = 0; x<=9; x++){
            grid.push([x,y])
        }

    }
        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey for lab {lab.lab_number}</PageTitle>
                    <SurveyQuestion>This is question {question}/3</SurveyQuestion> 
                    <SurveyQuestion>Mark with your finger where you think on this axis matches your emotional response to this lab most effetively (if close to an axis you agree strongly)</SurveyQuestion>

    
                        <Grid>
                            <YTextMin> {q.y.neg} </YTextMin>
                            <XYGridText>{q.x.pos}</XYGridText> 
                            <XYGrid>
                                <FlatList 
                                data={grid}
                                renderItem={renderGrid}
                                key={10}
                                numColumns={10}
                                ItemSeparatorComponent={<View style={{
                                    padding:'2.4%'}}></View>}
                                ></FlatList>
                                
                            </XYGrid>
                            <YText >{q.y.pos}</YText>
                            <XYGridText>{q.x.neg}</XYGridText>
                        </Grid>

                    <StyledButton title = "next" onPress={onPressForward}><StyledButtonText> Next </StyledButtonText></StyledButton>
                    <StyledButton title = "back" onPress={onPressBack}><StyledButtonText> Back </StyledButtonText></StyledButton>
              
                </ContentJustified>
            </View>
        )
    
};
}



export default SurveyLab;