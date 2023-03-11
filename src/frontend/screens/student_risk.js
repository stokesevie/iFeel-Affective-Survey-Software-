import React, {useContext, useReducer } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,FlatList} from 'react-native'
import { BubbleText, BubbleTextBold, ContentJustified, PageTitle, StyledButton, StyledButtonText, StyledListButton, SubTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';
import { Alert } from 'react-native';
import TutorCourse from './tutor_course';
/*
This screen shows all student risks
*/
const StudentRisk = ({route,navigation})=>{
    const relatedRisks = route.params.relatedRisks
    const teaching_id = route.params.teaching_id
    const labDetail = route.params.labDetail
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const [loading,setLoading] = useState(true)
    const { url } = useContext(AuthContext);

    const flag = async()=>{
        const flagUrl = url +`/course/${relatedRisks[0].student_id}/${teaching_id}/`
        let change = {'flag':'true'}
        const update = await fetch(flagUrl, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${access}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(change)
          });
        let r = update.status

        showAlert()

    }

    useEffect(()=>{
        if (loading){
            setLoading(false)
        }
    },[loading])

    const showAlert = () => {
        Alert.alert(
          'Flagging Student',
          'Would you like to send message with this flag?',
          [
            {text: 'Yes', onPress: () => {
                return navigation.navigate("SendNew", {'receiver_id':relatedRisks[0].student_id,'course':labDetail.course_title, otherName: relatedRisks[0].student_first_name})
        }},
            {text: 'No', style: 'cancel'},
          ],
          { cancelable: false }
        )
      }

    const unFlag = async()=>{
        const flagUrl = url +`/course/${relatedRisks[0].student_id}/${teaching_id}/`
        let change = {'flag':'false'}
        const update = await fetch(flagUrl, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${access}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(change)
          });
        let r = update.status

        return navigation.navigate("TutorDashboard")
    }


    const FlagStudent =()=>{
        if (!relatedRisks[0].flag){
            return <StyledButton onPress={flag}><StyledButtonText>Flag this student</StyledButtonText></StyledButton>
        }else{
            return <StyledButton onPress={unFlag}><StyledButtonText>Unflag this student</StyledButtonText></StyledButton>
        }
    }

    const Risk=({item})=>{
        if (item.risk){
            return (<><BubbleTextBold>{item.axis_neg}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{color:'red',fontWeight:'bold'}}>risk zone</Text> as defined by your axis.</Text></>)
        }else if (item.warning){
            return (<><BubbleTextBold>{item.axis_neg}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{color:'#e69a11',fontWeight:'bold'}}>warning zone</Text> as defined by your axis.</Text></>)
        }
    }

    if (!loading){
        return (<ContentJustified>
            <PageTitle>{relatedRisks[0].student_first_name} {relatedRisks[0].student_last_name}</PageTitle>
            <SubTitle>{relatedRisks[0].lab_title} lab risks</SubTitle>
            <StyledButton onPress={()=>{
                    navigation.navigate("AllRisks", {student: relatedRisks[0].student_id})}}><StyledButtonText>See all student risks</StyledButtonText></StyledButton>
            <FlagStudent/>
            <FlatList
            data={relatedRisks}
            renderItem={({item})=>{
                return (<StyledListButton>
                    <BubbleText><Risk item = {item}/></BubbleText>
                </StyledListButton>)
            }}
            ></FlatList></ContentJustified>)
    }

   
}

export default StudentRisk;