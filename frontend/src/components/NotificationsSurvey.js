import React, { useContext, useEffect, useState } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,BubbleContent,Theme,StyledBubble, BubbleText, BubbleTextBold, Center} from './styles'
import {Ionicons} from '@expo/vector-icons';
import AuthContext from "../utils/auth_context";

export function NotificationsSurvey(props){
  const user = props.user
  const courses = props.courses
  const [surveys, setSurveys] = useState([])
  const [loading , setLoading] = useState([true])
  const {url} = useContext(AuthContext)
  const access = JSON.parse(localStorage.getItem("authTokens"))['access']

  const fetchLabs = async ()=>{
    let pending = []
    let survey = []
    const labsUrl = url+`/labs/${courses[0].course_id}`
        const lab_response = await fetch(labsUrl, {
            method : 'GET',
            headers :{
              'Authorization': `Bearer ${access}`,
              'Content-Type' : 'application/json',
              'Accept':'application/json',
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
    const todoUrl = url+`/survey_student/${l.lab_id}/${user.user_id}/`
        const todo_response = await fetch(todoUrl, {
            method : 'GET',
            headers :{
              'Authorization' : `Bearer ${access}`, 
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
          <BubbleTextBold> {surveys[0][0].course_id}</BubbleTextBold>
          . You must complete 
          <BubbleTextBold> {surveys[0][0].title} survey</BubbleTextBold>.
          </BubbleText>



   
  </StyledBubble>
    )
    
  }
  
 



  }
  




