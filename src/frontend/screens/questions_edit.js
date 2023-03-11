import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import AuthContext from '../utils/auth_context';
import { Alert } from 'react-native';

import { BubbleText, BubbleTextBold, CenterText, ContentJustifiedBack, CourseDetail, PageTitle, AxisListButton, SubTitle, StickToBottom, StyledButtonEdit, StyledButtonText } from '../components/styles';
import { ActivityIndicator } from 'react-native';

/*
This screen allows the tutor to see questions for an affective survey
*/

const QuestionsEdit = ({route,navigation}) => { 
    const { url } = useContext(AuthContext);
    const  lab  = route.params.lab
    const  course  = route.params.course
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [noLab,SetNoLab]= useState(false)
    const [questionsSet,setQuestionsSet] = useState([])
    const [postReady,setPostReady] = useState(false)
    const [questionIDs,setQuestionIDs] = useState([])

    const access = JSON.parse(localStorage.getItem("authTokens"))['access']

    useEffect(()=>{
        try{
            if(route.params.refresh && !loading){
                setLoading(true)
                setQuestions([])
            }
        }catch{
    
        }
    },[noLab])

    useEffect(()=>{
        if (route.params.refresh){
            setLoading(true)
        }
    },[route.params.refresh])

    useEffect(()=>{
        if (route.params.questionSet){
            let alreadyExists = false
            for (let i in questionsSet){
                if (route.params.questionNumber==questionsSet[i]){
                    alreadyExists=true

                }
            }
            if (!alreadyExists){
                setQuestionIDs(current=>[...current,route.params.questionID])
                setQuestionsSet(current=>[...current,route.params.questionNumber])
            }
  


        }
    },[route.params.questionNumber])

    useEffect(()=>{
        let max;
        try{
            max = Math.max(...questionsSet);
        }catch{

        }
        if (max==3 && questionsSet.length==3){
                setPostReady(true)
        }
    },[questionsSet])


    const getSurvey = async ()=>{
        const surveyUrl = url+`/survey/${lab.lab.lab_id}/${lab.tutor_teaching_id}/`
        let response = await fetch(surveyUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
        })
        let s = await response.json().catch(error=>{})
        try{
            for (let q=1;q<4;q++){
                let question = await getQuestion(s['question_'+q])
                if (question){
                    setQuestions(current => [...current, question]);
                }
            }
        }catch{
            SetNoLab(true)
        }

        setLoading(false)
    }

    useEffect(()=>{
        if (loading){
            getSurvey()


        }
    },[loading])

    const onPressPost = async (d)=>{
        let post;
        if (d){
            //this is going to make a default survey
            post = {
                'lab_id': lab.lab.lab_id,
                'tutor_teaching_id':lab.tutor_teaching_id
            }
        }else{
            post = {
            'question_1':questionIDs[0],
            'question_2':questionIDs[1],
            'question_3':questionIDs[2],
            'lab_id': lab.lab.lab_id,
            'tutor_teaching_id':lab.tutor_teaching_id
        }
        }
        const surveyUrl = url+`/post_survey/`
        let response = await fetch(surveyUrl, {
            method : 'POST',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
              body: JSON.stringify(post)
        })
        let q = await response.json().catch(error=>{})
        Alert.alert("Lab survey has been set")
        navigation.navigate("TutorDashboard")
        SetNoLab(false)
        
        

    }
    const getQuestion = async(question_id)=>{
        const questionsUrl = url+`/question/${question_id}/`
        let response = await fetch(questionsUrl, {
            method : 'GET',
            headers :{
                'Authorization' :`Bearer ${access}`, 
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
        })
        let q = await response.json().catch(error=>{})
        return q
    }

    const makeSurvey = (number)=>{
        navigation.navigate("NewAxis",{axis:'x',course:course,lab:lab,questionNumber:number})
    }

    const CheckQuestionSet = ({q})=>{
        for (let i in questionsSet){
            if (q==questionsSet[i]){
                return (<CourseDetail>Question Set</CourseDetail>)
            }
        }
        return (<>
        <CourseDetail>Set axis x and y</CourseDetail>
        
        <StickToBottom>
    <StyledButtonEdit onPress={()=>{makeSurvey(q)}}><StyledButtonText>Edit Axis</StyledButtonText></StyledButtonEdit>
    </StickToBottom></>)
    }

    const PostSurvey = ()=>{
        if (postReady){
            return( <StyledButtonEdit onPress={()=>{onPressPost(false)}}><StyledButtonText>Create Survey</StyledButtonText></StyledButtonEdit>
            )
        }
        else{
            return 
        }
       
    }


    
    if (!loading){

        if (!noLab){
        return (
                <ContentJustifiedBack>
                    <PageTitle>Make Survey Changes:</PageTitle>  
                    <SubTitle>{course}: Lab {lab.lab.lab_title} (lab {lab.lab.lab_number})</SubTitle>
                    <SubTitle>Select question to change:</SubTitle>
                    <FlatList
                    data = {[0,1,2]}
                    renderItem={({item})=>{
                        let question = questions[item][0]
                        let r = false;
                        try{ r = route.params.refresh}catch{}
                        return (<AxisListButton onPress={()=>{
                            navigation.navigate("QuestionEdit",{question: question,course: course, questionNumber :item+1, lab:lab,refresh:r})
                            setLoading(true)}}><CenterText><BubbleTextBold>Question {item+1}{`\n`}</BubbleTextBold>
                        <CourseDetail>Axis currently selected:{`\n`}</CourseDetail>
                        <CourseDetail>x: </CourseDetail><BubbleText>{question.x.neg} - {question.x.pos}{`\n`}</BubbleText>
                        <CourseDetail>y: </CourseDetail><BubbleText>{question.y.neg} - {question.y.pos}</BubbleText>
                        </CenterText></AxisListButton>)
                    }}/>
                </ContentJustifiedBack>
        )
    }else{

        return (<ContentJustifiedBack>
        <PageTitle>Make Survey:</PageTitle>  
        <SubTitle>{course}: Lab {lab.lab.lab_title} (lab {lab.lab.lab_number})</SubTitle>
        <FlatList
            data = {[1,2,3]}
            renderItem={({item})=>{
                return (<AxisListButton><CenterText><BubbleTextBold>Question {item}</BubbleTextBold></CenterText>
                <CheckQuestionSet q ={item}></CheckQuestionSet>
                </AxisListButton>)
            }}
        />
        <PostSurvey/>
        <StyledButtonEdit onPress={()=>{onPressPost(true)}}><StyledButtonText>Use default affective questions</StyledButtonText></StyledButtonEdit>
        </ContentJustifiedBack>)
    }
    }else{
        return(<ContentJustifiedBack>
            <ActivityIndicator visible={loading} color='black' style={{flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                paddingTop: 30,
                padding: 8,}}/>
        </ContentJustifiedBack>)
    }
   
};
export default QuestionsEdit;
