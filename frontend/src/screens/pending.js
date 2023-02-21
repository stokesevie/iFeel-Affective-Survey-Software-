import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';
import { useContext } from 'react';
import AuthContext from '../utils/auth_context';
import jwt_decode from "jwt-decode";


const Pending = ({navigation}) => {
    const { user,updateMessages, updateCourses,updateUserInfo,userInfo } = useContext(AuthContext);
   

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
        const coursesUrl = `http://127.0.0.1:8000/courses/`+ user.user_id+`/`
        const course_response = await fetch(coursesUrl, {
            method : 'GET',
            headers :{
                'Authorization':`Bearer ${access}`,
                'Content-Type' : 'application/json',
            },
        })
        
        let c = await course_response.json().then(course=>nav(course)).catch(console.error)
    }

    const fetchUserInfo = async ()=>{
        const access = JSON.parse(localStorage.getItem("authTokens"))['access']
        const userUrl = `http://127.0.0.1:8000/users/`+ user.user_id +`/`
        const response = await fetch(userUrl, {
          method : 'GET',
          headers :{
            'Authorization' :`Bearer ${access}`, 
            'Content-Type' : 'application/json',
          },
      })
      let i = await response.json().then(info=>updateUserInfo(info)).catch(error=>{})
      
    }


    useEffect(()=>{
        try{
            if (user.user_id){
                getMessages()
                fetchUserInfo()
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