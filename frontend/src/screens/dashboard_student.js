import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContentJustified, PageTitle, SubTitle } from '../components/styles';
import AuthContext from "../utils/auth_context";
import { NotificationsSurvey } from '../components/NotificationsSurvey'
import { NotificationsAlert } from '../components/NotificationsAlert'
import { NotificationsMessage } from '../components/NotificationsMessage'


const StudentDashboard = ({navigation}) => {
    const { user } = useContext(AuthContext);
    
    const [userInfo, setUserInfo] = useState([])
        const url = `http://backend-production-94f0.up.railway.app/users/`+ user.user_id
        useEffect(()=>{
            getUserInfo()
        },[])
        const getUserInfo = async ()=>{
            const response = await fetch(url, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setUserInfo(data)
        });
        }
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