import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Text,View } from 'react-native';
import { CourseDetail, StyledListButton, CourseTitle } from './styles';
import { useState, setState, useEffect } from 'react';


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

