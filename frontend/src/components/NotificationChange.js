import React, { useContext, useEffect, useState } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,BubbleContent,Theme,StyledBubble, BubbleText, BubbleTextBold, Center} from './styles'
import {Ionicons} from '@expo/vector-icons';

import AuthContext from "../utils/auth_context";

export function NotificationChange(props){
  const user = props.user
  const courses = props.courses
  const [surveys, setSurveys] = useState([])
  const access = JSON.parse(localStorage.getItem("authTokens"))['access']


    return(
    <StyledBubble>
          <Center><Ionicons name="terminal-outline" size={35} color={Theme.secondary}></Ionicons></Center>
          <BubbleTextBold>Would you like to make changes to {courses[0].course_title} surveys?</BubbleTextBold>
         <BubbleText>Most recently published lab:
          <BubbleTextBold> Lab {courses[0].lab.lab_number}</BubbleTextBold>
          <BubbleText> survey, titled : {courses[0].lab.lab_title}</BubbleText>.
          </BubbleText>



   
  </StyledBubble>
    )
    
  
  
 



  }
  




