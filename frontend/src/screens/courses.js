import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';
import { FlatList } from 'react-native';
import StyledCourse from '../components/StyledCourse';

import { ContentJustified, PageTitle } from '../components/styles';

const Courses = ({navigation}) => { 
    const { user,courses } = useContext(AuthContext);

     
    return (
        <View>
            <ContentJustified>
                <PageTitle>{user.first_name}, you are enrolled in the following courses:</PageTitle>  
                <FlatList
                data={courses}
                renderItem ={({item})=>(
                    <StyledCourse
                     course = {item}
                     navigation = {navigation}
                     />
                )
                }
                />

            </ContentJustified>
        </View>
    )
};
export default Courses;