import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { StyleSheet, Text, View} from 'react-native'
import { FlatList } from 'react-native';
import StyledLab from '../components/StyledLab';

import { ContentJustifiedBack, PageTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';

const Course = ({route, navigation}) => {
    const { course } = route.params
    const courseDetail = course.courseDetail
    const [ labs, setLabs] = useState([])
    const [ pending, setPending] = useState([])
    const {user} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const {url} = useContext(AuthContext)
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    useEffect(()=>{fetchLabs()},[])

    const fetchLabs = async ()=>{
        const labUrl = url+`/labs/${courseDetail.id}`
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
            const survey_exist = url+`/survey/${labs[0][i].lab_id}/${user.user_id}/`
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
    
    if(!loading){
        return (
        <View>
            <ContentJustifiedBack>
                <PageTitle>{courseDetail.title} Labs:</PageTitle>  
                <FlatList
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
                     />)
                }
                }
                />
            </ContentJustifiedBack>
        </View>
    )}
   
};
export default Course;