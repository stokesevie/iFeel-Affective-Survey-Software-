import React, {useContext} from 'react';
import { CourseDetail, StyledListButton, CourseTitle } from './styles';

export default function StyledLabTutor(props){
    const {course,lab, navigation } = props

        return(
            <StyledListButton onPress= {
                ()=>{
                    navigation.navigate("TutorLab",{lab:lab, course:course})
                }
            }>  
                <CourseDetail>{course}</CourseDetail>
                <CourseTitle>{lab.lab.lab_title}</CourseTitle>
            </StyledListButton>
                )
    }


