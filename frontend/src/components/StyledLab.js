import React from 'react';
import { CourseDetail, StyledListButton, CourseTitle } from './styles';


export default function StyledLab(props){
    const {lab, navigation } = props

    return(
        <StyledListButton onPress= {
            ()=>{
                navigation.navigate("Survey",{ lab:  {lab}})
            }
        }>
            <CourseDetail>{lab.lab_number}</CourseDetail>
            <CourseTitle>{lab.title}</CourseTitle>
        </StyledListButton>
            )
}

