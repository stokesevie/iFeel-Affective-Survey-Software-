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
  const [axis, setAxis] = useState([])
  const [label, setLabel] = useState([])
  const [risksFetched,setRisksFetched] = useState(false)
  const [axisFetched,setAxisFetched] = useState(false)

  const fetchRecent = async ()=>{
    let invalid = false;
    let pending=[]

    const recentUrl = `http://backend-production-94f0.up.railway.app/student_lab_risks/`+user.user_id
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        risks[0] = await recent_response.json()
        setRisksFetched(true)

  }

  const fetchAxis = async (risks) =>{
    const axisUrl = `http://backend-production-94f0.up.railway.app/axis_detail/`+ risks[0].axis_id
        const axis_response = await fetch(axisUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        axis[0] = await axis_response.json()
        setAxisFetched(true)
  }

  const fetchAxisLabels = async (axis)=>{

    const labelsUrl = `http://backend-production-94f0.up.railway.app/axis_labels/`+axis.x_id
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
    fetchAxis(risks[0])
  }

  if (axisFetched){
    fetchAxisLabels(axis[0])
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

      <BubbleText>You are in the <BubbleTextBold>{zone}</BubbleTextBold> zone for this weeks lab. You found it more <BubbleTextBold>{label[0].neg_title}</BubbleTextBold> than other students.</BubbleText>
      </StyledBubbleLarge>
  );
  }


    }  

