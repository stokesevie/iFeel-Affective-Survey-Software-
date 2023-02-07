import React, { useContext, useEffect, useState } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,BubbleContent,Theme,StyledBubble, BubbleText, BubbleTextBold, Center} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { View,Text } from "react-native";
import StyledMessage from "./StyledMessage";
import AuthContext from "../utils/auth_context";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { UNSAFE_DataRouterContext } from "react-router-dom";

export function NotificationsSurvey(props){
  const userInfo = props.userInfo
  const user = props.user
  const courses = props.courses
  const [surveys, setSurveys] = useState([])
  const [loading , setLoading] = useState([true])


  const fetchLabs = async ()=>{
    let pending = []
    let survey = []
    const labsUrl = `http://backend-production-94f0.up.railway.app/labs/`+ courses[0].lab_id   
        const lab_response = await fetch(labsUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        let labs = await lab_response.json()
        
        for (const x in labs){
          let l = labs[x]
          pending = await fetchTodo(pending,l)
          if (pending[x]==true){
            survey.push(l)
          }
        }

        surveys[0] = survey
        setLoading(false)
        
  }



  const fetchTodo = async (pending, l)=>{
    let invalid = false;
    const todoUrl = `http://backend-production-94f0.up.railway.app/student_lab/`+user.user_id+`/`+l.lab_id
        const todo_response = await fetch(todoUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        let todo = await todo_response.json().catch((error)=>{
            invalid = true
            pending.push(invalid)
        })
        if (!invalid){
          pending.push(invalid)
          
        }

        return pending

      
        

  }




  useEffect(()=>{
    fetchLabs()

  })

  if (!loading){
    return(
    <StyledBubble>
          <Center><Ionicons name="alert-circle-outline" size={35} color={Theme.secondary}></Ionicons></Center>
         <BubbleText>Reminder for
          <BubbleTextBold> {courses[0].lab_id}</BubbleTextBold>
          . You must complete 
          <BubbleTextBold> {surveys[0][0].title} survey</BubbleTextBold>.
          </BubbleText>



   
  </StyledBubble>
    )
    
  }
  
 



  }
  




