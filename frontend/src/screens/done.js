import React, { useState, useEffect } from 'react'
import {View} from 'react-native'

import { ContentJustified, PageTitle, StyledButton,StyledButtonText, SubTitle } from '../components/styles';

/* This is the end screen for the survey. This will show the performance of the student in relation to the zones laid out by 
the backend of the database. This will then use these marks to offer the student to message their tutor. It will also add the current 
score to the average */


const Done = ({route, navigation}) => {
    const { lab,response,questions } = route.params
    const onPress = ()=>{
       navigation.navigate("StudentDashboard")
    }

    const decide = (x,risk,warning,average)=> {
        if (x>risk){
            return "RISK"
        }else if (x<=risk){
            if (x>warning){
                return "WARNING"
            }else if (x<=warning){
                if (x>average){
                    return "AVERAGE"
                }else if (x<=average){
                    return "GOOD"
                }
            }
        }
    }
    useEffect(()=>{
        alert(decide(response[0][1],8,6,4))
    })
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from done</PageTitle>  
                <SubTitle>You completed survey for lab {lab.lab.lab_number} for {lab.lab.course_id} </SubTitle>
                <StyledButton title = "Home" onPress={onPress}><StyledButtonText> Return Home </StyledButtonText></StyledButton>
              
            </ContentJustified>
        </View>
    )
};
export default Done;