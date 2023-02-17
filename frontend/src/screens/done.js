import React, { useState, useEffect, useContext } from 'react'
import {View,Linking, FlatList} from 'react-native'

import { DoneTextBold, ContentJustified, PageTitle, StyledButton, StyledDoneButton,StyledButtonText, SubTitle, TutorStudentFeedback, ResponseText } from '../components/styles';
import SurveyResponseText from '../components/SurveyResponseText';
import AuthContext from '../utils/auth_context';
import moment from '../node_modules/moment'

/* This is the end screen for the survey. This will show the performance of the student in relation to the zones laid out by 
the backend of the database. This will then use these marks to offer the student to message their tutor. It will also add the current 
score to the average */


const Done = ({route, navigation}) => {
    const { lab,response,questions,survey } = route.params
    const {user} = useContext(AuthContext)
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [tutor, setTutor] = useState(false);
    const [student, setStudent] = useState(false)
    const [avg, setAvg] = useState([])
    const [studentStats, setStudentStats] = useState([])

    const onPress = ()=>{
       navigation.navigate("StudentDashboard")
    }

    const decide = (a,risk,warning,average)=> {
        if (a>=risk){
            return "RISK"
        }else if (a<risk){
            if (a>=warning){
                return "WARNING"
            }else if (a<warning){
                if (a>=average){
                    return "AVERAGE"
                }else if (a<average){
                    return "GOOD"
                }
            }
        }
    }

    const AxisAverage = async (axis,r)=>{
        let a = {
            'lab_id': lab.lab.lab_id,
            'axis_id': axis,
            'point': r
        }
        const lab_risk = `http://127.0.0.1:8000/average/`
            let response = await fetch(lab_risk, {
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(a),
            }).catch(console.error)
    }

    useEffect(()=>{
        let responses = []
        for (let i = 0; i<3;i++){
            let q = questions.questions[i][0]
            let r = response[i]
            let adjust_r = 10-r[0]
            AxisAverage(q.x.id, adjust_r)
            AxisAverage(q.y.id, r[1])
            let x = decide(adjust_r,q.x.risk,q.x.warn,q.x.ave)
            let y = decide(r[1],q.y.risk,q.y.warn,q.y.ave)
            responses.push([q,x,y])
        }
        stats[0] = buildStatsTutor(responses)
        postResponses(responses)
        setCompleted()
        GetAxisAverage()
        setLoading(false)


        

    })

    const setCompleted = async ()=>{
        let survey_id = survey.survey[0].id
        let lab_id = lab.lab.lab_id
        let student_id = user.user_id

        let p ={
            'survey_id': survey_id,
            'lab_id': lab_id,
            'student_id':student_id,
            'completed':true
        }

        const surveyUrl = `http://127.0.0.1:8000/survey/`
            let response = await fetch(surveyUrl, {
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(p),
            }).catch(console.error)

            let api_r = response.status
            await api_r
    }

    const buildStatsTutor = (responses)=>{
        let good = []
        let bad = []
        let text =  " You reported yourself to find this lab "
        for (let i = 0; i<3; i++){
            if (responses[i][1]!= "GOOD" && responses[i][1]!="AVERAGE"){
                let s = [responses[i][1], text + responses[i][0].x.neg+ "."]
                bad.push(s)
            }else{
                let s = [responses[i][1], text + responses[i][0].x.pos+ "."]
                good.push(s)
            }
            if (responses[i][2]!= "GOOD" && responses[i][2]!="AVERAGE"){
                let s = [responses[i][2], text + responses[i][0].y.neg+ "."]
                bad.push(s)
            } else{
                let s = [responses[i][2] , text + responses[i][0].y.pos+ "."]
                good.push(s)
            }
        }
        return [[good],[bad]]
    }

    const buildStatsStudent = (li)=>{
        let str=[];
        for (let i = 0;i<6;i++){
            let ave = li[i][0].point__avg
            let neg = li[i][1]
            let r = li[i][2]
            if (ave> r){
                str.push("You found this lab more " + neg + " than the average student who took this survey.")
            }
        }
        studentStats[0] = str

    }


    const postResponses = (responses)=>{
        for (let i = 0; i<3;i++){
            let r = responses[i]
            post(r,"x")
        }
    }

    const post = async (r,axis)=>{
        let d = moment().format("YYYY-MM-DD")
        let a;
        if (axis =="x"){
            a = r[0].x.id
        }else{
            a = r[0].y.id
        }
        let p = {
            'student_id': user.user_id,
            'lab_id':lab.lab.lab_id,
            'axis_id':a,
            'date':d,
            'risk':false,
            'warning':false,
            'avg':false
        }

        if (axis =="x"){
            if (r[1] == "AVERAGE"){
                p.avg = true
            }else if(r[1] == "WARNING"){
                p.warning = true
            }else if (r[1] == "RISK"){
                p.risk = true
            }else{
                return
            }
        }else{
            if (r[2] == "AVERAGE"){
                p.avg = true
            }else if(r[2] == "WARNING"){
                p.warning = true
            }else if (r[2] == "RISK"){
                p.risk = true
            }
            else{
                return
            }
        }

        const lab_risk = `http://127.0.0.1:8000/student_lab_risk/`
            let response = await fetch(lab_risk, {
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(p),
            }).catch(console.error)

            let api_r = response.status
            await api_r


    }


    const ShowHelp = () =>{
        if (JSON.stringify(stats[0][1][0])!="[]"){
            return <StyledButton title = "Help" onPress={()=>{
                Linking.openURL(lab.lab.help)
            }}><StyledButtonText> Want help with this lab? </StyledButtonText></StyledButton>                 
        }else{
            return
        }
    }

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
                renderItem = {item => <SurveyResponseText props = {item.item}/>}>
            </FlatList>
        </>
        )
    }

    const fetchAverage = async(axis,r)=>{
        const averageUrl = `http://127.0.0.1:8000/average/`+lab.lab.lab_id+`/`+axis.id
        const average_response = await fetch(averageUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        }).catch(console.error)
        let average = await average_response.json()
        return [average,axis.neg,r]
    }

    const GetAxisAverage = async ()=>{
        let qs = questions.questions
        let li = []
        for (let i = 0;i<3;i++){
            let q = qs[i][0]
            let r = response[i]
            li.push(await fetchAverage(q.x,r[0]))
            li.push(await fetchAverage(q.y,r[1]))
        }
        buildStatsStudent(li)

    }

    const ShowList = ()=>{
        if (tutor){
            return (<><ShowFlatList text = "Above Lab Average" data = {stats[0][0][0]}/>
            <ShowFlatList text = "Below Lab Average" data = {stats[0][1][0]}/></>)    
        } else if (student){
            return (<><FlatList ListHeaderComponent={()=><DoneTextBold>Affective Student Average Comparison</DoneTextBold>} data = {studentStats[0]} renderItem={item=><ResponseText>{'\n'}{item.item}</ResponseText>}/></>)
        }
       } 
    if (!loading){
        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey Completed</PageTitle>  
                    <SubTitle>You completed survey for lab {lab.lab.lab_number} for {lab.lab.course_id}. In this survey your response showed:  </SubTitle>
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
                        <ShowHelp/>
                        <StyledDoneButton title = "Home" onPress={onPress}><StyledButtonText> Return Home </StyledButtonText></StyledDoneButton>
                </ContentJustified>
            </View>
        )
    }


};
export default Done;