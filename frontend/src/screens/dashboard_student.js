import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContentJustified, PageTitle, SubTitle } from '../components/styles';
import AuthContext from "../utils/auth_context";
import { NotificationsSurvey } from '../components/NotificationsSurvey'
import { NotificationsAlert } from '../components/NotificationsAlert'
import { NotificationsMessage } from '../components/NotificationsMessage'


const StudentDashboard = ({route, navigation}) => {
    const { user,userInfo,messages,courses } = useContext(AuthContext);
    return (
        <View>
            <ContentJustified>

                <PageTitle>Home</PageTitle>  
                <SubTitle> Welcome, {userInfo.first_name} !</SubTitle>
                <NotificationsSurvey userInfo={userInfo} user ={user} courses = {courses}/>
                <NotificationsAlert userInfo={userInfo} user={user}/>
                <NotificationsMessage userInfo = {userInfo} user ={user} messages = {messages}/>

                
           </ContentJustified>
        </View>
    )
};

export default StudentDashboard;