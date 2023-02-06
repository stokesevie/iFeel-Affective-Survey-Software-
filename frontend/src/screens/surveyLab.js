import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View} from 'react-native'
import { XYGrid, XMin, YMin, XYGridText, YTextMin, Grid, YText, SurveyQuestion, StyledButtonText,Row,Cell } from '../components/styles';

import { ContentJustified, PageTitle, StyledButton } from '../components/styles';

const SurveyLab = ({route, navigation}) => {
    const { labDetail, question, questions,response } = route.params
    const lab = labDetail.lab
    const q = questions.questions[question-1][0]
    const [colour, setColour] = useState(-1)
    const [pressed, setPressed] = useState(false)

    const onPressForward = ()=>{
        if (question>=3){
            navigation.navigate("Done",{
                lab : {lab},
                response :response,
                questions: questions
            })
        }else{
            setPressed(false)
            setColour(-1)
            navigation.navigate("SurveyLab", {
                labDetail: {lab}, 
                question :question+1,
                questions : questions,
                response:response
                
            })
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
                    response:response.splice(-1)
                })
            }else{
                navigation.navigate("SurveyLab", {
                    labDetail: {lab}, 
                    question :question-1,
                    questions : questions,
                    response:response
                })
            }
        }
    }



    let grid = []

    for (let y = 0; y<=9;y++){
        for (let x = 0; x<=9; x++){
            grid.push([x,y])
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



        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey for lab {lab.lab_number}</PageTitle>
                    <SurveyQuestion>This is question {question}/3</SurveyQuestion>  

    
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



export default SurveyLab;