import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';
import { useContext } from 'react';
import AuthContext from '../utils/auth_context';
import jwt_decode from "jwt-decode";


const Pending = ({navigation}) => {
    const { user,updateMessages, updateCourses} = useContext(AuthContext);
   

    const getMessages = async()=>{
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
      const messageUrl = `http://127.0.0.1:8000/message/`+ user.user_id+`/`   
        const message_response = await fetch(messageUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',

            },
        })
        let m = message_response.json().then(messages => updateAuthM(messages)).catch(console.error)
    }

    const getCourses = async()=>{
        const access = JSON.parse(localStorage.getItem("authTokens"))['access']
        let coursesUrl;
        if (user.is_staff){
            coursesUrl= `http://127.0.0.1:8000/tutor_teaching/`+ user.user_id+`/`
        }else{
            coursesUrl = `http://127.0.0.1:8000/courses/`+ user.user_id+`/`
        }
        const course_response = await fetch(coursesUrl, {
            method : 'GET',
            headers :{
                'Authorization':`Bearer ${access}`,
                'Content-Type' : 'application/json',
            },
        })
        
        let c = await course_response.json().then(course=>nav(course)).catch(console.error)
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
        updateMessages(m)
    }

    const nav = async(c)=>{
        updateCourses(c)
        if (user.is_staff){
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