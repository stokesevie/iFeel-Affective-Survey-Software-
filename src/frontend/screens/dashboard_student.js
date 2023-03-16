import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContentJustified, PageTitle, SubTitle,Profile, Theme } from '../components/styles';
import AuthContext from "../utils/auth_context";
import { NotificationsSurvey } from '../components/NotificationsSurvey'
import { NotificationsAlert } from '../components/NotificationsAlert'
import { NotificationsMessage } from '../components/NotificationsMessage'
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';
/*
This screen will present the dashboard and most relevant information to the student
*/


const StudentDashboard = ({route, navigation}) => {

    const { user,courses,messages } = useContext(AuthContext)
    const [loading, setLoading] =useState(true)

    useEffect(()=>{
        if (loading && courses){
            checkCourses()
            checkExist()
            setLoading(false)
        }
    },[loading])

    const checkCourses = ()=>{
        try {
            let c = courses
            let u = user
            
        }catch{
            Alert.alert("Issue with loading in student courses")
        }
    }
    

    const checkExist=()=>{
        if (JSON.stringify(courses)=="[]"){
            Alert.alert("No courses found","You are not registered for any courses, contact a tutor if this is a mistake")
        }
    }
    
if (!loading){
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
}else{
        return(
            <ActivityIndicator visible={loading} color='black' style={{flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                paddingTop: 30,
                padding: 8,}}/>
        )
    }
};

export default StudentDashboard;