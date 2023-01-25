import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';
import { FlatList } from 'react-native';
import StyledCourse from '../components/StyledCourse';

import { ContentJustified, PageTitle } from '../components/styles';

const Courses = ({navigation}) => { 
    const { user,userInfo } = useContext(AuthContext);

    const [courses, setCourses] = useState([])

    useEffect( ()=>{
        fetchUserCourses();
    },[])

    const fetchUserCourses = async()=>{
        const courseUrl = `http://backend-production-94f0.up.railway.app/courses/`+ user.user_id
        const response = await fetch(courseUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setCourses(data)
        })
    }
     
    return (
        <View>
            <ContentJustified>
                <PageTitle>{userInfo.first_name}, you are enrolled in the following courses:</PageTitle>  
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