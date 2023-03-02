import React, { useEffect } from 'react'
import { Image,ImageBackground,View} from 'react-native'

import { useContext } from 'react';
import AuthContext from '../utils/auth_context';
import { ActivityIndicator } from 'react-native';

/* This screen takes the user logged in and finds related messages and courses before rendering the dashboard */

const Pending = ({navigation}) => {
    const { user,updateMessages, updateCourses,url} = useContext(AuthContext);
   
    // This function will get messages from the database sent to the user
    const getMessages = async()=>{
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
      const messageUrl = url+`/message/${user.user_id}/`   
        const message_response = await fetch(messageUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',

            },
        })
        let m = message_response.json().then(messages => updateAuthM(messages)).catch(console.error)
    }

    // This function wil get courses from the database that the user is enrolled in
    const getCourses = async()=>{
        const access = JSON.parse(localStorage.getItem("authTokens"))['access']
        let coursesUrl;
        if (user.is_staff){
            coursesUrl= url+`/tutor_teaching/${user.user_id}/`
        }else{
            coursesUrl = url+`/courses/${user.user_id}/`
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


    //If the screen attempts to find the messages/courses without the user being set, the user will be returned to login
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

    //once set the app will navigate to appropriate dashboard
    const nav = async(c)=>{
        updateCourses(c)
        try{
            let m = messages
            let c = courses 
            let u = user
        }catch{
           await courses
           await messages
           await user
        }finally{
            if (user.is_staff){
                return navigation.navigate("TutorDashboard")
            } else{
                return navigation.navigate("StudentDashboard")
            }
        }

    }

    //shows spinner as pending
    return (
            <ImageBackground source={require('../assets/splash.png')} resizeMode="cover" style={{flex:1}}>
            <ActivityIndicator visible={true} color='white' style={{flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    padding: 8,}}/>
            </ImageBackground>

        
    )
};
export default Pending;