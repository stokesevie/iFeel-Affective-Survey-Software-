import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';
import { useContext } from 'react';
import AuthContext from '../utils/auth_context';

const Pending = ({navigation}) => {
    const { user,userInfo,updateMessages } = useContext(AuthContext);
  
    const getMessages = async()=>{
      const messageUrl = `http://backend-production-94f0.up.railway.app/message/`+ user.user_id   
        const message_response = await fetch(messageUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        let m = await message_response.json()
        nav(m)   
    }
  
    useEffect(()=>{
        getMessages()
        
        
    },[])

    const nav = async (m) =>{
        updateMessages(m)
            if (userInfo.is_staff){
                return navigation.navigate("TutorDashboard")
            } else{
                return navigation.navigate("StudentDashboard")
            }
    }

    
    return (
        <ContentJustified>
            <PageTitle>LOADING</PageTitle>
        </ContentJustified>
        
    )
};
export default Pending;