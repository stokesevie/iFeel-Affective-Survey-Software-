import React from 'react';
import { CourseDetail, StyledListButton,StyledListButtonC, CourseTitle } from './styles';


export default function StyledLab(props){
    const {lab, navigation,pending,tutor,courseDetail } = props
        if (!pending){
            return(
                <StyledListButtonC onPress= {
                    ()=>{
                        navigation.navigate("Survey",{ lab:  lab, completed : pending,tutorDetail:tutor,courseDetail:courseDetail})
                    }
                }>
                    <CourseDetail>{lab.lab_number}</CourseDetail>
                    <CourseTitle>{lab.title}</CourseTitle>
                    <CourseDetail>{lab.date}</CourseDetail>
                </StyledListButtonC>
                    )
        }else{
            return(
                <StyledListButton onPress= {
                    ()=>{
                        navigation.navigate("Survey",{ lab:  lab, completed : pending,tutorDetail:tutor,courseDetail:courseDetail})
                    }
                }>
                    <CourseDetail>{lab.lab_number}</CourseDetail>
                    <CourseTitle>{lab.title}</CourseTitle>
                    <CourseDetail>{lab.date}</CourseDetail>
                </StyledListButton>
                    )
        }
    }
   


