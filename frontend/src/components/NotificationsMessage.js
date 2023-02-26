import React, { useState,useContext, useEffect } from "react";
import {Theme,Center, StyledBubble, BubbleText, BubbleTextBold} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { Text } from "react-native";
import AuthContext from "../utils/auth_context";



export function NotificationsMessage(props){
  const user = props.user
  const {messages} = useContext(AuthContext)
  const [date,setDate]= useState([])
  const [newMessages, setNewMessages] = useState([])
  const [loading,setLoading] = useState(true)


  const listFormatDate = ((date)=>{
    let dt = date.split(" ")
    let d = dt[0].split("-")
    let t = (dt[1].split(".")[0]).split(":")
    let format = d.concat(t)
    let l = format.map(d => Number(d));
    return l
  })


  const compare = ((d1,d2,time = false)=>{
    if (time){
      if (d1[3]>d2[3]){
        return d1
      }else if (d1[3]<d2[3]){
        return d2
      }else{
        if (d1[4]>d2[4]){
          return d1
        }else if (d1[4]<d2[4]){
          return d2
        } else{
          return d1
        }
      }
    }else{
    if (d1[0]>d2[0]){
      return d1
    }else if (d1[0]<d2[0]){
      return d2
    } else{
      if (d1[1]>d2[1]){
        return d1
      }else if (d1[1]<d2[1]) {
        return d2
      }else{
        if (d1[2]>d2[2]){
          return d1
        }else if (d1[2]<d2[2]){
          return d2
        }else{
          return compare(d1,d2,true)
        }
      }
    }
  }})


  const formatDate = ((date)=>{
    let dt = date.split(" ")
    let d = dt[0].split("-")
    let t = (dt[1].split(".")[0]).split(":")
    let format = d.concat(t)
      return <Text>{format[0]}/{format[1]}/{format[2]}</Text>
  })

  const checkRecent = ()=>{
    let count = 0
    for (let m in messages){
      let d = listFormatDate(messages[m].sent_at)
      let u = listFormatDate(user.last_login)
      if (JSON.stringify(compare(d,u))==JSON.stringify(d)){
        count+=1
      }
      newMessages[0] = count
    }
  }


  useEffect(()=>{
    setDate(formatDate(user.last_login))
    checkRecent()
    setLoading(false)
  },[])

  const CorrectParse=()=>{
    if (newMessages>1 | newMessages<1){
      return <Text>messages</Text>
    }else{
      return <Text>message</Text>
    }
  }

  const CheckIfTutor = ()=>{
    if (messages[0].staff){
      return (<Text style={{color:Theme.primary, fontWeight:'bold'}}> This is a message from your tutor.</Text>)
    }
  }

  if (!loading){
  return(
    <StyledBubble>
          <Center><Ionicons name="mail-unread-outline" size={35} color={Theme.secondary}></Ionicons></Center>
        <BubbleText>You have <BubbleTextBold>{newMessages}</BubbleTextBold> <CorrectParse></CorrectParse> since your last login ({date}). Most recent message from <BubbleTextBold>{messages[0].sender_f_name}</BubbleTextBold><CheckIfTutor/></BubbleText>

      </StyledBubble>
  
        
  )
  }



  }
  



