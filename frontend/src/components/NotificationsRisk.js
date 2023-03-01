import React, { useContext, useEffect, useState } from "react";
import { CenterText,StyledNotification,NotificationText,Arrow ,BubbleContent,Theme,StyledBubbleLarge, BubbleText, BubbleTextBold, Center} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { FlatList } from "react-native";
import AuthContext from "../utils/auth_context";

export function NotificationsRisk(props){
  const user = props.user
  const courses = props.courses
  const [risks, setRisks] = useState()
  const [loading,setLoading] = useState(true)
  const access = JSON.parse(localStorage.getItem("authTokens"))['access']
  const students = [{'student_id': '2563062y', 'at_risk': 'at risk in course social intelligence'},{'student_id': '2333030s', 'at_risk': 'at risk in course human computer interaction'}]
   

  const fetchStudentRisks = async (lab_id)=>{
    const lab_risk = `http://127.0.0.1:8000/student_lab_risks/lab/`+1+`/`
        let response = await fetch(lab_risk, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
        }).catch(console.error)

        let api_r = await response.json().catch(error=>{})
        if (api_r!=[]){
            setRisks(api_r)
        }else{
            
        }
        setLoading(false)
}

useEffect(()=>{
    if (loading){
        fetchStudentRisks(courses[0].lab.lab_id)
    }
},[loading])

const risk = (r)=>{
    if (r.risk){
        return "This student is in risk zone in this lab"
    }else if (r.warning){
        return "This student is in warning zone in this lab"
    }
    return
}



    if (!loading){
        let i = 0
        return(
            <StyledBubbleLarge>
            <Center><Ionicons name="alert-circle-outline" size={35} color={Theme.secondary}></Ionicons></Center>
            <CenterText><BubbleTextBold>Responses to {courses[0].course_title}</BubbleTextBold></CenterText>
            <FlatList
            data={risks}
            renderItem ={({item})=>{
                if (risk(item) && i<2){
                    i = i+1
                    let r = risk(item)
                    return (<>
                        <BubbleTextBold>{item.student_first_name} {item.student_last_name}</BubbleTextBold>
                        <BubbleText>{r} for axis {item.axis_neg}</BubbleText>
                        </>)
                }

            
            }}
            /></StyledBubbleLarge>
        )
    }

    
  
  
 



  }
  




