import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import AuthContext from '../utils/auth_context';


import { ContentJustifiedBack, PageTitle } from '../components/styles';
import StyledLabTutor from '../components/StyledLabTutor';

const TutorCourse = ({route,navigation}) => { 
    const { user } = useContext(AuthContext);
    const {labs,course} = route.params
    return (
        <View>
            <ContentJustifiedBack>
                <PageTitle>{course} labs you teach:</PageTitle>  
                <FlatList
                data={labs}
                renderItem ={({item})=>{

                    return (<StyledLabTutor lab = {item} course = {course} navigation = {navigation}></StyledLabTutor>)
                
                }}

                />

            </ContentJustifiedBack>
        </View>
    )
};
export default TutorCourse;
