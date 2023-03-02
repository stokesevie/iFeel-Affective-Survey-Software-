import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Text,FlatList,View } from 'react-native';
import { BubbleText, ContentJustifiedBack, PageTitle, StyledButton, StyledButtonText, SubTitle, ResponseText, DoneTextBold, TutorStudentFeedback } from '../components/styles';
import AuthContext from '../utils/auth_context';
import { Linking } from 'react-native';

const Survey = ({route, navigation}) => {
    const { lab,completed } = route.params
    const {user,url} = useContext(AuthContext)
    const [questions, setQuestions] = useState([])
    const [survey, setSurvey] = useState([])
    const [fetched,setFetched] = useState(false)
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([])
    const [studentStats,setStudentStats] = useState([])
    const [tutorStats,setTutorStats] = useState([])
    const [student,setStudent] = useState(false)
    const [tutor,setTutor] = useState(false)
    const [tutorDetail,setTutorDetail] = useState('')

    const access = JSON.parse(localStorage.getItem("authTokens"))['access']

//only update the value of 'count' when component is first mounted



    const fetchSurvey = ( async ()=>{
        
        const surveyUrl = url+`/survey/${lab.lab_id}/`
        const survey_response = await fetch(surveyUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
              },
        })
        let body = await survey_response.json()
        .then(async (data) =>{
            survey[0]=data
            for (let i = 1; i < 4; i++){
                let question = await fetchQuestion(data["question_" + i.toString()])
                setQuestions(current => [...current, question]);
            // setHelp()
                
                
        }})
        .catch(error=>{})
        
        const survey_exist = url+`/survey/${lab.lab_number}/${user.user_id}/`
        const exist_response = await fetch(survey_exist, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
              },
        })
        let r = await exist_response.json().catch(error=>{})

        setLoading(false)

        
    })

    const fetchQuestion = (async (question)=>{
        const questionUrl = url+`/question/${question}/`
        const question_response = await fetch(questionUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
              },
        })
        let body = await question_response.json()
        return body
    })

    const getResponses = async ()=>{
            const emotionalUrl = url+`/average_lab/${user.user_id}/${lab.lab_id}/`
                const emotional_response = await fetch(emotionalUrl, {
                    method : 'GET',
                    headers :{
                        'Authorization' :`Bearer ${access}`,
                        'Content-Type' : 'application/json',
                      },
                })
            let p = await emotional_response.json()
            results[0] = p

            const tutorUrl = url+`/student_lab/${user.user_id}/${lab.lab_id}/`
            const tutor_response = await fetch(tutorUrl, {
                method : 'GET',
                headers :{
                    'Authorization' :`Bearer ${access}`, 
                    'Content-Type' : 'application/json',
                  },
            })
            let t = await tutor_response.json()
            tutorStats[0] = t
            buildStatsStudent(p)
            getTutor()
            
     
        
    }

    const renderItem = (item)=>{

        const level = (item)=>{
            let i = item.item
            if (i.risk){
                return "RISK"
            }else if (i.warning){
                return "WARNING"
            }else if (i.avg){
                return "AVERAGE"
            }else{
                return
            }
        }        
        const RatingColour = ()=>{
            let colours = {"GOOD": '#33a244', "AVERAGE":'#340068', "WARNING": '#e69a11', "RISK": '#d33c19'}
            if (rating=="GOOD"){
                return <Text style={{fontWeight:'bold', color: colours["GOOD"]}}>{rating}</Text>
            } else if (rating =="AVERAGE"){
                return <Text style={{fontWeight:'bold', color: colours["AVERAGE"]}}>{rating}</Text>
            } else if (rating=="WARNING"){
                return <Text style={{fontWeight:'bold', color: colours["WARNING"]}}>{rating}</Text>
            } else {
                return <Text style={{fontWeight:'bold', color: colours["RISK"]}}>{rating}</Text>
            }
        }
        
        let rating = level(item)
        if (!rating){
            return
        }
        let t = RatingColour(rating)
        return <ResponseText>You are in {t} zone for {item.item.axis_negative}{`\n`}</ResponseText>
    }

    const buildStatsStudent = (li)=>{
        let str=[];
        for (let i = 0;i<6;i++){
            let ave = li[i].above
            let neg = li[i].axis_neg
            if (ave){
                str.push("You found this lab more " + neg + " than the average student who took this survey.")
        }
        studentStats[0]=str
    }
}

//fetches the tutor student teaching instance for this student and lab

const getTutor = async ()=>{
    const tutorTeachingUrl = url+`/student_teaching/${lab.lab_id}/`
    const tutorResponse = await fetch(tutorTeachingUrl, {
        method : 'GET',
        headers :{
            'Authorization' :`Bearer ${access}`, 
            'Content-Type' : 'application/json',
          },
    })
    let body = await tutorResponse.json().catch(error=>{})
    setTutorDetail(body[0])
    setLoading(false)


}

useEffect(()=>{
    if (!loading){
        
    }
},[loading])


    useEffect(()=>{
        if (completed){
            getResponses().catch(error=>{})

        }else{
        fetchSurvey()
        .catch(error=>{})
        }
    },[completed])



    const ShowFlatList = (data)=>{
        let t = data.text
        let d = data.data
        if (JSON.stringify(d)=="[]"){
            return
        }
        return (
        <>
            <DoneTextBold>
            {t}
            </DoneTextBold>

            <FlatList
                style = {{height:'100%',flex:1}}
                data={d}
                renderItem = {item=>renderItem(item)}>
            </FlatList>
        </>
        )
    }


    const ShowList = ()=>{
        if (tutor){
            return (<><ShowFlatList text = "Tutor Feedback" data = {tutorStats[0]}/></>)    
        } else if (student){
            return (<><FlatList ListHeaderComponent={()=><DoneTextBold>Affective Student Average Comparison</DoneTextBold>} data = {studentStats[0]} renderItem={item=><ResponseText>{'\n'}{item.item}</ResponseText>}/></>)
        }
       } 
    
    if (completed && !loading){
        return (
            <ContentJustifiedBack>
                    <PageTitle>Affective Survey for lab {lab.lab_number}</PageTitle>  
                    <SubTitle>{lab.title}</SubTitle>
                    <SubTitle>You have already completed this survey</SubTitle>
                    <View style={{ flexDirection:"row",justifyContent:'space-between' }}>
                        <TutorStudentFeedback title = "Tutor" onPress={()=>{if (student){
                            setStudent(false)
                        }
                        setTutor(true)}}><StyledButtonText>Tutor Feedback</StyledButtonText></TutorStudentFeedback>
                        <TutorStudentFeedback title = "Student"onPress={()=>{
                            if (tutor){
                                setTutor(false)
                            }
                            setStudent(true)}}><StyledButtonText>Student Feedback</StyledButtonText></TutorStudentFeedback>
                    </View>
                    <ShowList/>
                    <StyledButton title = "Home" onPress = {()=>(
                        navigation.navigate("StudentDashboard")
                    )}><StyledButtonText>Go Home</StyledButtonText></StyledButton>
            <DoneTextBold>Want help with this lab?</DoneTextBold>
            <StyledButton title = "Help" onPress={()=>{
                Linking.openURL(lab.lab.help)
            }}><StyledButtonText> Online resources </StyledButtonText></StyledButton>
            <StyledButton title = "Message" onPress={()=>{
                return navigation.navigate("SendNew", {'receiver_id':tutorDetail.tutor_username,'lab':lab.lab_id, 'tutor_name':tutorDetail.tutor_name, 'course':lab.course_id})
            }}><StyledButtonText> Message Tutor </StyledButtonText></StyledButton>
                </ContentJustifiedBack>
        )
    }else{
    if (!loading){
        return (
                <ContentJustifiedBack>
                    <PageTitle>Affective Survey for lab {lab.lab_number}</PageTitle>
                    <SubTitle>{lab.title}</SubTitle>

                    <StyledButton title = "Start" onPress = {()=>(
                        navigation.navigate("SurveyLab", {labDetail: {lab}, question :1, questions:{questions}, response:[],survey:{survey}})
                    )}><StyledButtonText>Start Survey</StyledButtonText></StyledButton>
              
                </ContentJustifiedBack>
        )

    }
}
   
};
export default Survey;