import React, { useEffect,useState } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Center ,ContentsNotification,Theme, StyledBubbleLarge, BubbleText, BubbleTextBold} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { View,Text } from "react-native";

export function NotificationsAlert(props) {
  const user = props.user
  const [loading, setLoading] = useState(true)
  const [risks, setRisks] = useState([])
  const [label, setLabel] = useState([])
  const [risksFetched,setRisksFetched] = useState(false)
  const [emotional, setEmotional] = useState([])

  const fetchRecent = async ()=>{

    const recentUrl = `http://127.0.0.1:8000/student_lab_risks/`+user.user_id
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        risks[0] = await recent_response.json()
        fetchStudentAverage()
        setRisksFetched(true)

  }

  const fetchStudentAverage = async ()=>{
    const recentUrl = `http://127.0.0.1:8000/average/`+user.user_id
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        let p = await recent_response.json()
        emotional[0]= p

  }

  const fetchAxisLabel = async (axis)=>{
    let a = axis[0].axis_id

    const labelsUrl = `http://127.0.0.1:8000/axis_labels/`+a
        const labels_response = await fetch(labelsUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        label[0] = await labels_response.json()
        setLoading(false)

  }

  useEffect(()=>{
    fetchRecent()
  })

  if (risksFetched){
    fetchAxisLabel(risks[0])
  }

  const ShowEmotional = ()=>{
    let r = emotional[0]
    if (r.above){
      return(<BubbleText>You recorded a <BubbleTextBold>Above Average </BubbleTextBold>emotional response to this lab. You found it more <BubbleTextBold>{r.axis_pos}</BubbleTextBold> than other students.</BubbleText>)
   
    }else{
      return(<BubbleText>You recorded a <BubbleTextBold>Below Average </BubbleTextBold>emotional response to this lab. You found it more <BubbleTextBold>{r.axis_neg}</BubbleTextBold> than other students.</BubbleText>)
    }
  }

  if (!loading){
    let r = risks[0][0]
    let zone = ""
    if (r.risk){
      zone = "RISK"
    }else if (r.warning){
      zone = "WARNING"
    }
    
    return (
      <StyledBubbleLarge>
        
       <Center><Ionicons name="warning-outline" size={35} color={Theme.secondary}></Ionicons></Center> 
       <BubbleTextBold>{risks[0][0].course_name} - lab {risks[0][0].lab_number}</BubbleTextBold>
      <BubbleText>You are in the <BubbleTextBold>{zone}</BubbleTextBold> zone for this lab. You found it more <BubbleTextBold>{label[0].neg_title}</BubbleTextBold> than the tutor expected.</BubbleText>
      <ShowEmotional/>
      </StyledBubbleLarge>
  );
  }


    }  

