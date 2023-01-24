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
  const [loading,setLoading]= useState(true)

  
  const compare = ((date1,date2)=>{

  })
  return(
    <StyledBubble>
        <BubbleText>You have 3 messages since your last login ({userInfo.last_login}) Most recent message from <BubbleTextBold>{messages[0].sender_id}</BubbleTextBold></BubbleText>
      </StyledBubble>
        
  )



  }
  



