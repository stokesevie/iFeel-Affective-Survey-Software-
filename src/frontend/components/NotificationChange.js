import React, { useContext, useEffect, useState } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,BubbleContent,Theme,StyledBubble, BubbleText, BubbleTextBold, Center} from './styles'
import {Ionicons} from '@expo/vector-icons';

import AuthContext from "../utils/auth_context";

export function NotificationChange(props){
  const user = props.user
  const courses = props.courses
  let c;
  try{
    c = courses[0][0]
  }catch{
    c = false
  }

  if (!c){
    return (
      <StyledBubble>
            <Center><Ionicons name="terminal-outline" size={35} color={Theme.secondary}></Ionicons></Center>
            <BubbleText><BubbleTextBold>You cannot edit any surveys</BubbleTextBold>
            </BubbleText>
  
    </StyledBubble>
    )
  }else{
    return(
      <StyledBubble>
            <Center><Ionicons name="terminal-outline" size={35} color={Theme.secondary}></Ionicons></Center>
            <BubbleText><BubbleTextBold>Edit {c.course_title} surveys?</BubbleTextBold>
          Most recent lab:
            <BubbleTextBold> Lab {c.lab.lab_number}</BubbleTextBold>
            <BubbleText> titled {c.lab.lab_title}</BubbleText>.
            </BubbleText>
  
  
  
     
    </StyledBubble>
      )
  }

    
  
  
 



  }
  




