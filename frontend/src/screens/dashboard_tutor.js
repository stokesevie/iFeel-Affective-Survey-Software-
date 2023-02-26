import React, { useState, useEffect } from 'react'
import { FlatList, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons';
import { BubbleText, BubbleTextBold, ContentJustified, PageTitle, StyledBubble, StyledBubbleLarge,Theme,Center, CenterText } from '../components/styles';

const TutorDashboard = ({navigation}) => {
    const students = [{'student_id': '2563062y', 'at_risk': 'at risk in course social intelligence'},{'student_id': '2333030s', 'at_risk': 'at risk in course human computer interaction'}]
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from dashboard tutor</PageTitle>  
                <StyledBubble>
                <Center><Ionicons name="terminal-outline" size={35} color={Theme.secondary}></Ionicons></Center>
                <CenterText><BubbleTextBold>Would you like to make changes to a lab survey?</BubbleTextBold></CenterText><BubbleText>
               Social Intelligence : Lab 2</BubbleText></StyledBubble>
                
                <StyledBubbleLarge>
                <Center><Ionicons name="alert-circle-outline" size={35} color={Theme.secondary}></Ionicons></Center>
                <CenterText><BubbleTextBold>Students at risk{`\n`}</BubbleTextBold></CenterText>
                <FlatList
                data={students}
                renderItem ={({item})=>{
                    return (<>
                    <BubbleTextBold>{item.student_id}</BubbleTextBold>
                    <BubbleText>{item.at_risk}</BubbleText>
                    </>)
                
                }}
                /></StyledBubbleLarge>
                <StyledBubble>
                <Center><Ionicons name="mail-unread-outline" size={35} color={Theme.secondary}></Ionicons></Center>
        <BubbleText>You have <BubbleTextBold>3 messages</BubbleTextBold> since your last login (23/02/2023). Most recent message from <BubbleTextBold>Evie</BubbleTextBold></BubbleText>
        </StyledBubble>
            </ContentJustified>
        </View>
    )
};
export default TutorDashboard;