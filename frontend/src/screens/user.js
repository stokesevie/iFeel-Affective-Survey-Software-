
import React, { useContext, useEffect, useState } from 'react'
import {View,Text} from 'react-native'

import { BubbleText, DoneTextBold, ContentJustified, PageTitle, StyledBubbleLarge, StyledButton,StyledButtonText, SubTitle, BubbleTextBold, CenterText } from '../components/styles';
import AuthContext from '../utils/auth_context';
import moment from '../node_modules/moment'


/*
This screen allows the user to log out and displays the student with their level
*/
const User = ({route, navigation}) => {
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const {user,setAuthTokens,setUser,url} = useContext(AuthContext)
    const [student, setStudent] = useState()
    const [loading,setloading] = useState(true)
    var date = moment()
    .format('YYYY-MM-DD HH:mm:ss');
    date += '+00:00'

    useEffect(()=>{
        if (loading){
            if (user.is_staff){
            }else{
            StudentDetails()
            }
        }

    },[loading])

    const StudentDetails = async ()=>{
        const studentUrl = url+`/students/${user.user_id}/`
        const student_response = await fetch(studentUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
              },
        })
        await student_response.json().then(data =>setStudent(data)).catch(error=>setStudent(false))
        setloading(false)
        
    }

    if (!user.is_staff&& !loading){
        return (
        <View>
            <ContentJustified>
                <PageTitle>Student Home</PageTitle>  
                <CenterText>
                <BubbleTextBold>{user.first_name} {user.last_name} {`\n`}Level: {student.level}{`\n`}</BubbleTextBold>
                </CenterText>
                <SubTitle>Log out?</SubTitle>
                
                <StyledButton onPress={()=>{
                    setAuthTokens(null)
                    setUser(null)
                    localStorage.clear()
                    navigation.navigate("Login")
                    }}><StyledButtonText>Log out</StyledButtonText></StyledButton>
            </ContentJustified>
        </View>
    )}else if (user.is_staff){
        return (
            <View>
                <ContentJustified>
                    <PageTitle>Tutor Profile</PageTitle> 
                    <SubTitle>Log out?</SubTitle>
                    
                    <StyledButton onPress={()=>{
                        setAuthTokens(null)
                        setUser(null)
                        localStorage.clear()
                        navigation.navigate("Login")
                        }}><StyledButtonText>Log out</StyledButtonText></StyledButton>
                </ContentJustified>
            </View>
        )
    }
    }

export default User;