import React, { useState, useEffect, useContext } from 'react'
import {View,Linking, FlatList} from 'react-native'

import { DoneTextBold, ContentJustified, PageTitle, StyledButton, StyledDoneButton,StyledButtonText, SubTitle, TutorStudentFeedback, ResponseText } from '../components/styles';
import SurveyResponseText from '../components/SurveyResponseText';
import AuthContext from '../utils/auth_context';
import moment from '../node_modules/moment'
import { Alert } from 'react-native';
/* This is the end screen for the survey. This will show the performance of the student in relation to the zones laid out by 
the backend of the database. This will then use these marks to offer the student to message their tutor. It will also add the current 
score to the average */


const Done = ({route, navigation}) => {
    const { lab,response,questions,survey,tutorDetail,courseDetail } = route.params
    const {user,url} = useContext(AuthContext)
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [tutor, setTutor] = useState(false)
    const [student, setStudent] = useState(false)
    const [studentStats, setStudentStats] = useState([])
    const [allStats,setAllStats] = useState([])
    const [posted, setPosted] = useState(false)
    const [surveyPosted, setSurveyPosted] = useState(false)
    const [responsesPosted, setResponsesPosted] = useState(false)
    const [fetched,setFetched] = useState(false)
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']

    const onPress = ()=>{
       navigation.navigate("StudentDashboard")
    }

    const decide = (a,risk,warning)=> {
        if (a>=risk){
            return "RISK"
        }else if (a<risk){
            if (a>=warning){
                return "WARNING"
            }else if (a<warning){
                    return "GOOD"
                
            }
        }
    }

    const AxisAverage = async (axis,r,above)=>{  
       if (!posted){ 
        let a = {
            'lab_id': lab.lab.lab_id,
            'axis_id': axis,
            'point': r,
            'student_id':user.user_id,
            'above':above,
            'date': moment().format("YYYY-MM-DD")
        }

        const lab_risk = url+`/average/`
            let response = await fetch(lab_risk, {
                method : 'POST',
                headers :{
              'Authorization': `Bearer ${access}`,
              'Content-Type' : 'application/json',
              'Accept':'application/json',
            },
                body: JSON.stringify(a),
            }).catch(console.error)
    }else{
        return
    }
    }

    useEffect(()=>{
        if (loading){
        let responses = []
        for (let i = 0; i<3;i++){
            let q = questions.questions[i][0]
            let r = response[i]
            let adjust_r = 10-r[0]
            let x = decide(adjust_r,q.x.risk,q.x.warn)
            let y = decide(r[1],q.y.risk,q.y.warn)
            responses.push([q,x,y])
        }
        stats[0] = buildStatsTutor(responses)
        GetAxisAverage()
        postResponses(responses)
        if (!surveyPosted){
            setCompleted()
        }

        setLoading(false)
        }

    },[loading])

    const setFlagged = async ()=>{
        const flagUrl = url+`/student_lab_risk/${user.user_id}/${tutorDetail.tutor_teaching}/count/`
        const flag_response = await fetch(flagUrl, {
            method : 'GET',
            headers :{
                'Authorization': `Bearer ${access}`,
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
        }).catch(console.error)
        let flagged = await flag_response.json()

        if (flagged){
            let put = {'flag': 'true'}
            const changeFlagUrl = url+`/course/${user.user_id}/${tutorDetail.tutor_teaching}/`
            const putChange = await fetch(changeFlagUrl, {
            method : 'PUT',
            headers :{
                'Authorization': `Bearer ${access}`,
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
            body: JSON.stringify(put)
        }).catch(console.error)
        Alert.alert("Warning","Automatically flagged")
        }

    }


    const GetAxisAverage = async ()=>{
        let qs = questions.questions
        let li = []
        for (let i = 0;i<3;i++){
            let q = qs[i][0]
            let r = response[i]
            let adjust_r = 10-r[0]
            li.push(await fetchAverage(q.x,adjust_r))
            li.push(await fetchAverage(q.y,r[1]))
        }
        buildStatsStudent(li)

    }

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

        const surveyUrl = url+`/survey/`
            let response = await fetch(surveyUrl, {
                method : 'POST',
                headers :{
                    'Authorization' :`Bearer ${access}`, 
                    'Content-Type' : 'application/json',
                  },
                body: JSON.stringify(p),
            }).catch(console.error)

            let api_r = response.status
        setSurveyPosted(true)
    }

    const buildStatsTutor = (responses)=>{
        let stats = []
        let good=[]
        let bad = []
        let text =  " You reported yourself to find this lab "
        for (let i = 0; i<3; i++){
            if (responses[i][1]!= "GOOD" && responses[i][1]!="AVERAGE"){
                let s = [responses[i][1], text + responses[i][0].x.neg+ "."]
                stats.push(s)
                bad.push(s)
            }else{
                let s = [responses[i][1], text + responses[i][0].x.pos+ "."]
                stats.push(s)
                good.push(s)
            }
            if (responses[i][2]!= "GOOD" && responses[i][2]!="AVERAGE"){
                let s = [responses[i][2], text + responses[i][0].y.neg+ "."]
                stats.push(s)
                bad.push(s)
            } else{
                let s = [responses[i][2] , text + responses[i][0].y.pos+ "."]
                stats.push(s)
                good.push(s)
            }

        }
        setAllStats(stats)
        return [[good],[bad]]
    }

    //this compares the students responses with the responses of that of the average student
    const buildStatsStudent = (li)=>{
        let str=[];
        for (let i = 0;i<6;i++){
            let ave = li[i][0].point__avg
            let neg = li[i][1]
            let r = li[i][2]
            let id = li[i][3]
            if (ave< r){
                str.push("You found this lab more " + neg + " than the average student who took this survey.")
                AxisAverage(id, r,false)
            }else{
                AxisAverage(id,r,true)
            }
        }
        if (JSON.stringify(str)=="[]"){
            str.push("You were above average in all questions.")
        }
        setPosted(true)
        studentStats[0] = str

    }


    const postResponses = async (responses)=>{
        for (let i = 0; i<3;i++){
            let r = responses[i]
            await post(r,"x")
            await post(r,"y")
        }
        setResponsesPosted(true)
    }

    useEffect(()=>{
        if (responsesPosted){
            setFlagged()
        }
    },[responsesPosted])

    const post = async (r,axis)=>{

        if (!responsesPosted){
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
            'warning':false
        }

        if (axis =="x"){
            if(r[1] == "WARNING"){
                p.warning = true
            }else if (r[1] == "RISK"){
                p.risk = true
            }else{
                return
            }
        }else{
           if(r[2] == "WARNING"){
                p.warning = true
            }else if (r[2] == "RISK"){
                p.risk = true
            }
            else{
                return
            }
        }

        const lab_risk = url+`/student_lab_risk/`
            let response = await fetch(lab_risk, {
                method : 'POST',
                headers :{
                    'Authorization': `Bearer ${access}`,
                    'Content-Type' : 'application/json',
                    'Accept':'application/json',
                  },
                body: JSON.stringify(p),
            }).catch(error=>{console.log(error)})

            let api_r = response.status
            await api_r

    }
}


    //this shows help if the student found the lab difficult

    const ShowHelp = () =>{
        if (JSON.stringify(stats[0][1][0])!="[]"){
            return <>
            <DoneTextBold>Want help with this lab?</DoneTextBold>
            <StyledButton title = "Help" onPress={()=>{
                Linking.openURL(lab.lab.help)
            }}><StyledButtonText> Online resources </StyledButtonText></StyledButton>
            <StyledButton title = "Message" onPress={()=>{
                return navigation.navigate("SendNew", {'receiver_id':tutorDetail.tutor_id,'lab':lab.lab.lab_id,'tutor_name':tutorDetail.tutor_name, 'course':lab.lab.course_id})
            }}><StyledButtonText> Message Tutor </StyledButtonText></StyledButton>
            </>                 
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
        const averageUrl = url+`/average/${lab.lab.lab_id}/${axis.id}/`
        const average_response = await fetch(averageUrl, {
            method : 'GET',
            headers :{
                'Authorization': `Bearer ${access}`,
                'Content-Type' : 'application/json',
                'Accept':'application/json',
              },
        }).catch(console.error)
        let average = await average_response.json()
        return [average,axis.neg,r,axis.id]
    }

    const ShowList = ()=>{
        if (tutor){
            return (<><ShowFlatList text = "Tutor Feedback" data = {allStats}/></>)    
        } else if (student){
            return (<><DoneTextBold>Affective Student Average Comparison</DoneTextBold><FlatList data = {studentStats[0]} renderItem={item=><ResponseText>{'\n'}{item.item}</ResponseText>}/></>)
        }
       } 



    
    if (!loading){
 
        return (
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
        )
    }


};
export default Done;