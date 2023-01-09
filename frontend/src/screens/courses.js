import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';
import { FlatList } from 'react-native';
import StyledCourse from '../components/StyledCourse';

import { ContentJustified, PageTitle } from '../components/styles';

const Courses = ({navigation}) => {
    const { user } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState([])
    const [courses, setCourses] = useState([])

    useEffect( ()=>{
        fetchUserInfo(); 
        fetchUserCourses();
    },[])

    const fetchUserInfo = ()=>{
        const userUrl = `http://backend-production-94f0.up.railway.app/users/`+ user.user_id
        fetch(userUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setUserInfo(data)
        })
    }

    const fetchUserCourses = async()=>{
        const courseUrl = `http://127.0.0.1:8000/courses/`+ user.user_id
        const response = await fetch(courseUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
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
                     onPress={()=>{
                        navigation.navigate("Course")
                    }}
                     />
                )
                }
                />

            </ContentJustified>
        </View>
    )
};
export default Courses;