import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View} from 'react-native'
import { XYGrid, XMin, YMin, XYGridText, YTextMin, Grid, YText, SurveyQuestion, StyledButtonText,Row,Cell } from '../components/styles';

import { ContentJustified, PageTitle, StyledButton } from '../components/styles';

const Demo = ({route, navigation}) => {
    const { question,lab,questionNumber } = route.params
    const [colour, setColour] = useState(-1)
    const [pressed, setPressed] = useState(false)

    let grid = []

    for (let y = 0; y<=9;y++){
        for (let x = 0; x<=9; x++){
            grid.push([x,y])
        }

    }
    const onPressForward = ()=>{
       alert("Demo Axis")
    }

    const onPressBack = ()=>{
        alert("Demo Axis")
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
            }else {
                setPressed(true)
            }
        }} >
            <Text style = {{color: c}}>X</Text>
        </Cell>)
    }

        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey for lab {lab.lab_number}</PageTitle>
                    <SurveyQuestion>This is question {questionNumber}/3</SurveyQuestion> 
                    <SurveyQuestion>Mark with your finger where you think on this axis matches your emotional response to this lab most effetively (if close to an axis you agree strongly)</SurveyQuestion>

    
                        <Grid>
                            <YTextMin> {question.y.neg} </YTextMin>
                            <XYGridText>{question.x.pos}</XYGridText> 
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
                            <YText >{question.y.pos}</YText>
                            <XYGridText>{question.x.neg}</XYGridText>
                        </Grid>

                    <StyledButton title = "next" onPress={onPressForward}><StyledButtonText> Next </StyledButtonText></StyledButton>
                    <StyledButton title = "back" onPress={onPressBack}><StyledButtonText> Back </StyledButtonText></StyledButton>
              
                </ContentJustified>
            </View>
        )
    
};



export default Demo;