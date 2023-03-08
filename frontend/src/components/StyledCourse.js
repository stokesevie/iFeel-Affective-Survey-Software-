import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { Text,View } from 'react-native';
import { CourseDetail, StyledListButton, CourseTitle } from './styles';
import { useState,useEffect } from 'react';
import AuthContext from '../utils/auth_context';
import { ActivityIndicator } from 'react-native';

export default function StyledCourse(props){
    const {course, navigation } = props
    const [courseDetail, setCourseDetail] = useState([])
    const [fetched, setFetched] = useState(false)
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const {url} = useContext(AuthContext)

    

    const fetchCourseDetail = async ()=>{
        const userUrl = url+`/courseDetail/${course.course_id}`
        const response = await fetch(userUrl, {
            method : 'GET',
            headers :{
                'Authorization': `Bearer ${access}`,
                'Content-Type' : 'application/json',
                'Accept':'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setCourseDetail(data)}).catch(console.error)
        setFetched(true)
    }

    useEffect(()=>{
        fetchCourseDetail()
    },[])


    if (fetched){
        let tutor = course.tutor
        return(
            <StyledListButton onPress= {
                ()=>{
                    navigation.navigate("Course",{ course:  courseDetail, tutor :tutor})
                }
            }>
                <CourseDetail>{course.course_id}</CourseDetail>
                <CourseTitle>{courseDetail.title}</CourseTitle>
            </StyledListButton>
                )
    }else{
        return(<StyledListButton>
            <ActivityIndicator visible={fetched} color='black' style={{flex: 1,
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: 30,
            padding: 8,}}/>
        </StyledListButton>)
    }

}

