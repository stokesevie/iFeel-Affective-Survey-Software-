import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import StyledComponentsNative from 'styled-components/native';

import { ContentJustified, PageTitle, StyledButton, StyledButtonText } from '../components/styles';

const Survey = ({route, navigation}) => {
    const { lab } = route.params.lab
    return (
        <View>
            <ContentJustified>
                <PageTitle>Survey for {lab.lab_id}</PageTitle>  
                <StyledButton title = "Start" onPress = {()=>(
                    navigation.navigate("SurveyLab", {labDetail: {lab}, question :1})
                )}><StyledButtonText>Start Survey</StyledButtonText></StyledButton>
          
            </ContentJustified>
        </View>
    )
};
export default Survey;