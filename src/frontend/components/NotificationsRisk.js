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
const {url} = useContext(AuthContext)

let recent = courses[0][0]
  const fetchStudentRisks = async (lab_id)=>{
    const lab_risk = url +`/student_lab_risks/lab/${lab_id}/`
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
}

useEffect(()=>{
    if (loading){
        fetchStudentRisks(recent.lab.lab_id)
        setLoading(false)
    }
},[loading])

const risk = (r)=>{
    if (r.risk){
        return "This student is in the risk zone for this lab"
    }else if (r.warning){
        return "This student is in the warning zone for this lab"
    }
    return
}

const IfNoResponses = ()=>{
    let i = 0;
    if (JSON.stringify(risks)!="[]"){
        return (<FlatList
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
            />)
    }else{
        return (<CenterText><BubbleText>{`\n`}No students have responded to this survey yet</BubbleText></CenterText>)
    }
}


    if (!loading){
        return(
            <StyledBubbleLarge>
            <Center><Ionicons name="alert-circle-outline" size={35} color={Theme.secondary}></Ionicons></Center>
            <CenterText><BubbleTextBold>Responses to {recent.course_title}{`\n`} </BubbleTextBold>
            <BubbleText>{recent.lab.lab_title} (lab {recent.lab.lab_number})</BubbleText></CenterText>
            <IfNoResponses></IfNoResponses>
            </StyledBubbleLarge>
        )
    }

    
  
  
 



  }
  




