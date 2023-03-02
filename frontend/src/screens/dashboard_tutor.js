import React, { useState, useEffect } from 'react'
import { FlatList, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons';
import { BubbleText, BubbleTextBold, ContentJustified, PageTitle, StyledBubble, StyledBubbleLarge,Theme,Center, CenterText, SubTitle } from '../components/styles';
import { NotificationsMessage } from '../components/NotificationsMessage';
import { useContext } from 'react';
import AuthContext from '../utils/auth_context';
import { NotificationChange } from '../components/NotificationChange';
import { NotificationsRisk } from '../components/NotificationsRisk';

/*
This screen will present the dashboard and most relevant information to the tutor
*/

const TutorDashboard = ({navigation}) => {
    const {user,messages,courses} = useContext(AuthContext)
    const students = [{'student_id': '2563062y', 'at_risk': 'at risk in course social intelligence'},{'student_id': '2333030s', 'at_risk': 'at risk in course human computer interaction'}]
    return (
        <View>
            <ContentJustified>
                <PageTitle>Tutor Dashboard</PageTitle>  
                <SubTitle>Hello, {user.first_name}!</SubTitle>
                <NotificationChange user = {user} courses = {courses}></NotificationChange>
                <NotificationsRisk user = {user} courses = {courses}></NotificationsRisk>
                <NotificationsMessage user ={user} messages = {messages}/>


       
            </ContentJustified>
        </View>
    )
};
export default TutorDashboard;