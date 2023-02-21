import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';


import { ContentJustified, PageTitle } from '../components/styles';

const TutorCourses = ({navigation}) => { 
    const { user,userInfo,authTokens } = useContext(AuthContext);
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']


    const fetchTeaching = async ()=>{

        const teaching = `http://127.0.0.1:8000/tutor_teaching/`+ user.user_id+`/`
            let response = await fetch(teaching, {
                method : 'GET',
                headers : {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type' : 'application/json',
                    'Accept':'application/json',
                },
            }).catch(console.error)
            let api_r = response.json()
            await api_r
            
    }

    useEffect(()=>{
        fetchTeaching().catch(console.error)
    })
    return (
        <View>
            <ContentJustified>
                <PageTitle>{userInfo.first_name}, you are teaching the following courses:</PageTitle>  


            </ContentJustified>
        </View>
    )
};
export default TutorCourses;