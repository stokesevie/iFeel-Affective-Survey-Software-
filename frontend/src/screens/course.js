import React, { useState, useEffect,setState } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { FlatList } from 'react-native';
import StyledLab from '../components/StyledLab';

import { ContentJustified, PageTitle } from '../components/styles';

const Course = ({route, navigation}) => {
    const { course } = route.params
    const courseDetail = course.courseDetail
    const [ labs, setLabs] = useState([])

    useEffect(()=>{fetchLabs()},[])
    const fetchLabs = async ()=>{
        const labUrl = `http://backend-production-94f0.up.railway.app/labs/`+ courseDetail.id
        response = await fetch(labUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setLabs(data)})
    }
    
    return (
        
        <View>
            
            <ContentJustified>
                <PageTitle>{courseDetail.title} Labs:</PageTitle>  
                <FlatList
                data = {labs}
                renderItem ={({item})=>(
                    <StyledLab
                     lab = {item}
                     navigation = {navigation}
                     />
                )
                }
                />
            </ContentJustified>
        </View>
    )
};
export default Course;