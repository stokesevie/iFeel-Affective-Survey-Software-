import React, { useEffect,useState,useContext } from "react";
import { Center ,CenterText,Theme, StyledBubbleLarge, BubbleText, BubbleTextBold} from './styles'
import {Ionicons} from '@expo/vector-icons';
import AuthContext from "../utils/auth_context";
import { ActivityIndicator } from "react-native";

export function NotificationsAlert(props) {
  const user = props.user
  const [loading, setLoading] = useState(true)
  const [risks, setRisks] = useState([])
  const [label, setLabel] = useState([])
  const [risksFetched,setRisksFetched] = useState(false)
  const [emotional, setEmotional] = useState([])
  const [emotionalFetched,setEmotionalFetched] = useState(false)
  const {url} = useContext(AuthContext)
  const access = JSON.parse(localStorage.getItem("authTokens"))['access']

  const fetchRecent = async ()=>{
    const recentUrl = url +`/student_lab_risks/${user.user_id}/`
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
              'Authorization' :`Bearer ${access}`, 
              'Content-Type' : 'application/json',
            },
        })
        risks[0] = await recent_response.json()
        fetchStudentAverage()
        setRisksFetched(true)

  }

  const fetchStudentAverage = async ()=>{
    let lab = risks[0][0].lab_id
    const recentUrl = url+`/average_lab/${user.user_id}/${lab}/`
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
              'Authorization' :`Bearer ${access}`, 
              'Content-Type' : 'application/json',
            },
        })

        let p = await recent_response.json()
        emotional[0]= p[0]
        setEmotionalFetched(true)

  }

  const fetchAxisLabel = async (axis)=>{
    let a = axis[0].axis_id

    const labelsUrl = url+`/axis_labels/${a}/`
        const labels_response = await fetch(labelsUrl, {
            method : 'GET',
            headers :{
              'Authorization' :`Bearer ${access}`, 
              'Content-Type' : 'application/json',
            },
        })
        label[0] = await labels_response.json()
        setLoading(false)

  }

  useEffect(()=>{
    if (loading){
      fetchRecent()
    }
    
  },[loading])

  if (risksFetched){
    fetchAxisLabel(risks[0])
  }

  const ShowEmotional = ()=>{
    let r = emotional[0]
    
    if (r.above){
      return(<BubbleText>You recorded a <BubbleTextBold>Above Average </BubbleTextBold>emotional response to this lab. You found it more <BubbleTextBold>{r.axis_pos}</BubbleTextBold> than other students.</BubbleText>)
   
    }else{
      return(<BubbleText>You recorded a <BubbleTextBold>Below Average </BubbleTextBold>emotional response to this lab. You found it more <BubbleTextBold>{r.axis_neg}</BubbleTextBold> than other students.</BubbleText>)
    }
  }

  if (!loading && emotionalFetched){
    let r;
    let zone = ""
    try{
      r=risks[0][0]
      let zone = ""
      if (r.risk){
        zone = "RISK"
      }else if (r.warning){
        zone = "WARNING"
      }
    }catch{
      return (
        <StyledBubbleLarge>
          
         <Center><Ionicons name="warning-outline" size={35} color={Theme.secondary}></Ionicons></Center> 
         <CenterText><BubbleTextBold>You are not at risk in any labs</BubbleTextBold></CenterText>
        </StyledBubbleLarge>
      );
    }


  
    
    return (
      <StyledBubbleLarge>
        
       <Center><Ionicons name="warning-outline" size={35} color={Theme.secondary}></Ionicons></Center> 
       <CenterText><BubbleTextBold>{risks[0][0].course_name} - lab {risks[0][0].lab_number}</BubbleTextBold></CenterText>
      <BubbleText>You are in the <BubbleTextBold>{zone}</BubbleTextBold> zone for this lab. You found it more <BubbleTextBold>{label[0].neg_title}</BubbleTextBold> than the tutor expected.</BubbleText>
      <ShowEmotional/>
      </StyledBubbleLarge>
    );
  }else{
    return(
      <StyledBubbleLarge>
      <ActivityIndicator visible={loading} color='black' style={{flex: 1,
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 30,
          padding: 8,}}/>
          </StyledBubbleLarge>
    )
  }


    }  

