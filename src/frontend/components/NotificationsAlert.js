import React, { useEffect,useState,useContext } from "react";
import { Center ,CenterText,Theme, StyledBubbleLarge, BubbleText, BubbleTextBold} from './styles'
import {Ionicons} from '@expo/vector-icons';
import AuthContext from "../utils/auth_context";
import { ActivityIndicator } from "react-native";

export function NotificationsAlert(props) {
  const user = props.user
  const [loading, setLoading] = useState(true)
  const [risks, setRisks] = useState()
  const [risksFetched, setRisksFetched] = useState(false)
  const [label, setLabel] = useState([])
  const [emotional, setEmotional] = useState()
  const [emotionalFetched,setEmotionalFetched] = useState(false)
  const [noLabs,setNoLabs] = useState(false)
  const {url} = useContext(AuthContext)
  const access = JSON.parse(localStorage.getItem("authTokens"))['access']


  useEffect(()=>{
    if (loading){
      fetchRecent()
    }

  },[loading])

  useEffect(()=>{
    if (risksFetched){
      fetchStudentAverage()
    }
  },[risksFetched])

  useEffect(()=>{
    if (emotionalFetched){
     setLoading(false)
    }
  },[emotionalFetched])

  const fetchRecent = async ()=>{
    const recentUrl = url +`/student_lab_risks/${user.user_id}/`
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
              'Authorization' :`Bearer ${access}`, 
              'Content-Type' : 'application/json',
            },
        })
        await recent_response.json().then(data=>setRisks(data[0])).catch(error=>{})
        setRisksFetched(true)
    }


  const fetchStudentAverage = async ()=>{
    let lab = risks.lab_id
    const recentUrl = url+`/average_lab/${user.user_id}/${lab}/`
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
              'Authorization' :`Bearer ${access}`, 
              'Content-Type' : 'application/json',
            },
        })

        let p = await recent_response.json().catch(error=>{})
       try{
        setEmotional(p[0])
        setEmotionalFetched(true)
       }catch{
        return
       }

  }





  const ShowEmotional = ()=>{
    let r = emotional
    try{
    if (r.above){
      return(<BubbleText>You recorded a <BubbleTextBold>Below Average </BubbleTextBold>emotional response to this lab. You found it more <BubbleTextBold>{r.axis_neg}</BubbleTextBold> than other students.</BubbleText>)

    }else{
      return(<BubbleText>You recorded a <BubbleTextBold>Above Average </BubbleTextBold>emotional response to this lab. You found it more <BubbleTextBold>{r.axis_pos}</BubbleTextBold> than other students.</BubbleText>)
       }
    }catch{}
  }

  if (!loading && emotionalFetched && risksFetched){
    let r;
    let zone;
    try{
      r=risks
      if (r.risk){
        zone = "RISK"
      }else if (r.warning){
        zone = "WARNING"
      }
      return (
        <StyledBubbleLarge>
          
         <Center><Ionicons name="warning-outline" size={35} color={Theme.secondary}></Ionicons></Center> 
         <CenterText><BubbleTextBold>{risks.course_name} - lab {risks.lab_number}</BubbleTextBold></CenterText>
        <BubbleText>You are in the <BubbleTextBold>{zone}</BubbleTextBold> zone for this lab. You found it more <BubbleTextBold>{risks.axis_neg}</BubbleTextBold> than the tutor expected.</BubbleText>
        <ShowEmotional/>
        </StyledBubbleLarge>
      )
    }catch{
      return (
        <StyledBubbleLarge>
          
         <Center><Ionicons name="warning-outline" size={35} color={Theme.secondary}></Ionicons></Center> 
         <CenterText><BubbleTextBold>You are not at risk in any labs</BubbleTextBold></CenterText>
        </StyledBubbleLarge>
      );
    }


  

  }else{
    if (noLabs){
      return (
        <StyledBubbleLarge>
          
         <Center><Ionicons name="warning-outline" size={35} color={Theme.secondary}></Ionicons></Center> 
         <CenterText><BubbleTextBold>You are not at risk in any labs</BubbleTextBold></CenterText>
        </StyledBubbleLarge>
      );
    }else{
      return(
        <StyledBubbleLarge>
        <ActivityIndicator testID="loading-indicator" visible={loading} color='black' style={{flex: 1,
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: 30,
            padding: 8,}}/>
            </StyledBubbleLarge>
      )
    }

  }


    }  

