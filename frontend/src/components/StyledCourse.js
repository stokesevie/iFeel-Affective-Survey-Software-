import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { Text,View } from 'react-native';
import { CourseDetail, StyledListButton, CourseTitle } from './styles';
import { useState, setState, useEffect } from 'react';
import Course from '../screens/course';

export default function StyledCourse(props){
    const {course, navigation } = props
    const [courseDetail, setCourseDetail] = useState([])
    const [fetched, setFetched] = useState(false)
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']

    const fetchCourseDetail = async ()=>{
        const userUrl = `http://127.0.0.1:8000/courseDetail/`+ course.lab_id
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
        return(
            <StyledListButton onPress= {
                ()=>{
                    navigation.navigate("Course",{ course:  {courseDetail}})
                }
            }>
                <CourseDetail>{course.lab_id}</CourseDetail>
                <CourseTitle>{courseDetail.title}</CourseTitle>
            </StyledListButton>
                )
    }

}

