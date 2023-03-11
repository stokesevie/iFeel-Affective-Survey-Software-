import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';
import { FlatList } from 'react-native';
import StyledCourse from '../components/StyledCourse';
import { ActivityIndicator } from 'react-native';
import { ContentJustified, PageTitle } from '../components/styles';

/*
This screen will present the list of courses the student is enrolled in
*/
const Courses = ({navigation}) => { 
    const { user,courses } = useContext(AuthContext);
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        if (loading){
            if (courses){
                setLoading(false)
            }
        }
    },[loading])

    if (!loading){
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
    }else{
        return (<ActivityIndicator visible={loading} color='black' style={{flex: 1,
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: 30,
            padding: 8,}}/>)
    }

};
export default Courses;