import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContentJustified, PageTitle, SubTitle } from '../components/styles';
import AuthContext from "../utils/auth_context";
import { NotificationsSurvey } from '../components/NotificationsSurvey'
import { NotificationsAlert } from '../components/NotificationsAlert'
import { NotificationsMessage } from '../components/NotificationsMessage'


const StudentDashboard = ({route, navigation}) => {
    const { user,userInfo } = useContext(AuthContext);


    return (
        <View>
            <ContentJustified>
                <PageTitle>Home</PageTitle>  
                <SubTitle> Welcome, {userInfo.first_name} !</SubTitle>
                <NotificationsSurvey userInfo={userInfo} onPress={()=>{
                    navigation.navigate('PendingSurveys')
                }}/>
                <NotificationsAlert userInfo={userInfo} onPress={()=>{
                    navigation.navigate('Labs')
                }}/>
                <NotificationsMessage userInfo={userInfo} onPress={()=>{
                    navigation.navigate('Messages')
                }}/>

                
           </ContentJustified>
        </View>
    )
};

export default StudentDashboard;