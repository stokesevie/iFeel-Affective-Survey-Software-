import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { StyleSheet, Text, View} from 'react-native'
import { FlatList } from 'react-native';
import StyledLab from '../components/StyledLab';
import { ActivityIndicator } from 'react-native';

import { BubbleText, BubbleTextBold, ContentJustifiedBack, PageTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';

/*
This screen will present the labs the user has completed surveys or not for
*/

const Course = ({route, navigation}) => {
    const { course,courseDetail,tutor } = route.params
    const [ labs, setLabs] = useState([])
    const [ pending, setPending] = useState([])
    const {user} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const {url} = useContext(AuthContext)
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']

    useEffect(()=>{fetchLabs()},[])
    const fetchLabs = async ()=>{
        const labUrl = url+`/labs/${course.id}`
        response = await fetch(labUrl, {
            method : 'GET',
            headers :{
                'Authorization': `Bearer ${access}`,
                'Content-Type' : 'application/json',
                'Accept':'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            labs[0]=(data)})
        .catch(console.error)
         
        let p =[]
        for (let i in labs[0]){
            const survey_exist = url+`/survey_student/${labs[0][i].lab_id}/${user.user_id}/`
            const exist_response = await fetch(survey_exist, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
              },
        })
        let r = await exist_response.json().catch(error=>{

        })

        try{
        if (r.completed){

        }}catch{
            p.push(labs[0][i])
        }

        }
        for (let i in p){
            p[i]= p[i].lab_id
        }
        setPending(p)
        setLoading(false)
    }

    const Flagged = ()=>{
        if (courseDetail.flag){
            return <BubbleText>You have been <BubbleTextBold>flagged</BubbleTextBold> in this course by tutor {courseDetail.tutor.tutor_name}. Tap a lab to see details of your affective state that
            may have caused concern.</BubbleText>
        }
    }
    
    if(!loading){
       
        return (
            <ContentJustifiedBack>
                <PageTitle>{course.title} Labs:</PageTitle>  
                <Flagged/>
                <BubbleTextBold>Labs highlighed red you have not completed surveys for yet</BubbleTextBold>
                <FlatList style={{flex:1}}
                data = {labs[0]}
                renderItem ={({item})=>{
                    let p=true
                    for (let i in pending){
                        if (pending[i] ==item.lab_id){
                            p = false
                        }
                    }
                    return(
                    <StyledLab
                    pending={p}
                    lab = {item}
                    navigation = {navigation}
                    tutor = {tutor}
                    courseDetail = {courseDetail}
                     />)
                }
                }
                />
            </ContentJustifiedBack>
    )}else{

        return (<ActivityIndicator visible={loading} color='black' style={{flex: 1,
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: 30,
            padding: 8,}}/>)
    }
   
};
export default Course;