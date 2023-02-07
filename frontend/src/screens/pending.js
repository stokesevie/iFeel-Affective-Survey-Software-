import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';
import { useContext } from 'react';
import AuthContext from '../utils/auth_context';


const Pending = ({navigation}) => {
    const { user,userInfo,updateMessages, updateCourses } = useContext(AuthContext);



    const getMessages = async()=>{
      const messageUrl = `http://backend-production-94f0.up.railway.app/message/`+ user.user_id   
        const message_response = await fetch(messageUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        let m = await message_response.json().catch(console.error)

        updateAuthM(m)   
    }

    const getCourses = async()=>{
        const coursesUrl = `http://backend-production-94f0.up.railway.app/courses/`+ user.user_id   
        const course_response = await fetch(coursesUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        let c = await course_response.json().catch(console.error)


        nav(c)   
    }


    useEffect(()=>{
        try{
            if (user.user_id){
                getMessages()
                getCourses()
            }
        } catch{
            return navigation.navigate("Login")
        }


        
        
    },[])

    const updateAuthM = async (m) =>{
        await updateMessages(m)
    }

    const nav = async(c)=>{
        updateCourses(c)
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