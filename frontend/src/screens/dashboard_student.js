import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContentJustified, PageTitle, SubTitle,Profile, Theme } from '../components/styles';
import AuthContext from "../utils/auth_context";
import { NotificationsSurvey } from '../components/NotificationsSurvey'
import { NotificationsAlert } from '../components/NotificationsAlert'
import { NotificationsMessage } from '../components/NotificationsMessage'

const StudentDashboard = ({route, navigation}) => {
    const { user,courses,messages } = useContext(AuthContext)

    return (
        <View>
            <ContentJustified>
                <PageTitle>Home</PageTitle>  
                <SubTitle> Welcome, {user.first_name}!</SubTitle>
                <NotificationsSurvey user ={user} courses = {courses}/>
                <NotificationsAlert user={user}/>
                <NotificationsMessage user ={user} messages = {messages}/>

                
           </ContentJustified>
        </View>
    )
};

export default StudentDashboard;