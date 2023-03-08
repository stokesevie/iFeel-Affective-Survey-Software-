import React, { useContext, useEffect, useState } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,BubbleContent,Theme,StyledBubble, BubbleText, BubbleTextBold, Center} from './styles'
import {Ionicons} from '@expo/vector-icons';

import AuthContext from "../utils/auth_context";

export function NotificationChange(props){
  const user = props.user
  const courses = props.courses

  let c = courses[0][0]
    return(
    <StyledBubble>
          <Center><Ionicons name="terminal-outline" size={35} color={Theme.secondary}></Ionicons></Center>
          <BubbleTextBold>Would you like to edit {c.course_title} surveys?</BubbleTextBold>
         <BubbleText>Most recent lab:
          <BubbleTextBold> Lab {c.lab.lab_number}</BubbleTextBold>
          <BubbleText> titled {c.lab.lab_title}</BubbleText>.
          </BubbleText>



   
  </StyledBubble>
    )
    
  
  
 



  }
  




