import React, { useState,useContext, useEffect } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,ContentsNotification,Theme, StyledBubble, BubbleText, BubbleTextBold} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { View,Text } from "react-native";
import AuthContext from "../utils/auth_context";
import { renderMatches } from "react-router-dom";
import { Spinner } from "react-bootstrap";


export function NotificationsMessage(props){
  const userInfo = props.userInfo
  const user = props.user
  const messages = props.messages
  const [date,setDate]= useState([])
  const [sender,setSender] = useState([])


  const fetchSender = async ()=>{
    const userUrl = `http://backend-production-94f0.up.railway.app/sender/`+ messages[0].sender_id
    const response = await fetch(userUrl, {
        method : 'GET',
        headers :{
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        setSender(data)})
}

useEffect(()=>{
    fetchSender()
  },[])

  const formatDate = ((date)=>{
    let dt = (date).split("T")
    let d = dt[0].split("-")
    let t = (dt[1].replace("Z","")).split(":")
    let format = d.concat(t)
      return <Text>{format[0]}/{format[1]}/{format[2]}</Text>
  })

  useEffect(()=>{
    setDate(formatDate(userInfo.last_login))
  },[])

  return(
    <StyledBubble>
        <BubbleText>You have <BubbleTextBold>3</BubbleTextBold> messages since your last login ({date}) Most recent message from <BubbleTextBold>{sender.first_name}</BubbleTextBold></BubbleText>
      </StyledBubble>
        
  )



  }
  



