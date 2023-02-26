import React, { useState, useEffect,useContext } from 'react'
import { View,FlatList} from 'react-native'
import AuthContext from '../utils/auth_context';


import { ContentJustified, PageTitle,BubbleTextBold, StyledListButton, CenterText, CourseDetail, CourseTitle } from '../components/styles';

const TutorCourses = ({navigation}) => { 
    const { user } = useContext(AuthContext);
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const [labs,setLabs] = useState()

    const [loading,setloading] = useState(true)

    const fetchTeaching = async ()=>{

        const teaching = `http://127.0.0.1:8000/tutor_teaching/`+ user.user_id+`/`
            let response = await fetch(teaching, {
                method : 'GET',
                headers : {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type' : 'application/json',
                    'Accept':'application/json',
                },
            }).catch(console.error)
            let api_r = await response.json()
            setLabs(api_r)          
            
    }


    useEffect(()=>{
        fetchTeaching().catch(console.error)
        
    },[loading])

    const uniqueCourses = ()=>{
        let c = []
        
        for (let l in labs){
            let found = false
            for (let i in c){
                if (labs[l].course_title== c[i]){
                    found = true
                }
            }
            if (!found){
                c.push(labs[l].course_title)
            }
        }
        return c
    }

   if (labs){
    let courses = uniqueCourses()
    return (
        <View>
            <ContentJustified>
                <PageTitle>{user.first_name}, you are teaching the following courses:</PageTitle>  
                <FlatList
                data={courses}
                renderItem ={({item})=>{
                    let relatedLabs = []
                    for(let l in labs){
                        if (labs[l].course_title == item){
                            relatedLabs.push(labs[l])
                        }
                    }
                    return (<>
                    <StyledListButton onPress = {()=>{navigation.navigate("TutorCourse", {labs: relatedLabs,course: item})}}><CenterText><CourseDetail>{relatedLabs[0].course_id}{`\n`}</CourseDetail><CourseTitle>{item}</CourseTitle></CenterText></StyledListButton>
                    </>)
                
                }}
                />

            </ContentJustified>
        </View>
    )}
};
export default TutorCourses;