import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle, StyledButton,StyledButtonText, SubTitle } from '../components/styles';

const Done = ({route, navigation}) => {
    const { lab } = route.params
    const onPress = ()=>{
       navigation.navigate("StudentDashboard")
    }
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