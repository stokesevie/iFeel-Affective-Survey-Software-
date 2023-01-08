import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Text,View } from 'react-native';
import { CourseDetail, StyledListButton } from './styles';

export default function StyledCourse(props){
    const {course, onPress } = props
    return(
        <StyledListButton onPress= {onPress}>
            <CourseDetail>{course.lab_id}</CourseDetail>
        </StyledListButton>
            )
}

