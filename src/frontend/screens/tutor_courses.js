import React, { useState, useEffect,useContext } from 'react'
import { View,FlatList} from 'react-native'
import AuthContext from '../utils/auth_context';


import { ContentJustified, PageTitle,BubbleTextBold, StyledListButton, CenterText, CourseDetail, CourseTitle } from '../components/styles';


/*
This screen allows the tutor to see which courses they teach
*/
const TutorCourses = ({navigation}) => { 
    const { user,url,courses } = useContext(AuthContext);
    const [labs,setLabs] = useState()

    
    const uniqueCourses = ()=>{
        let u = []
        let i;
        try{
        for (let c in courses){
            let name = courses[c][0].course_title
            let labs = courses[c]
            u.push([name,labs])
        }}
        catch(error){
            
        }
        return u
    }

   if (courses){
    let unique = uniqueCourses()
    return (
        <View>
            <ContentJustified>
                <PageTitle>{user.first_name}, you are teaching the following courses:</PageTitle>  
                <FlatList
                data={unique}
                renderItem ={({item})=>{
                    return (<>
                    <StyledListButton onPress = {()=>{navigation.navigate("TutorCourse", {labs: item[1],course: item[0]})}}><CenterText><CourseDetail>{item[1][0].course_id}{`\n`}</CourseDetail><CourseTitle testID="course-title" >{item[0]}</CourseTitle></CenterText></StyledListButton>
                    </>)
                
                }}
                />

            </ContentJustified>
        </View>
    )}
};
export default TutorCourses;