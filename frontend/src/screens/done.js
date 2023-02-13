import React, { useState, useEffect, useContext } from 'react'
import {View,Text, FlatList} from 'react-native'

import { BubbleText, DoneTextBold, ContentJustified, PageTitle, StyledButton, StyledDoneButton,StyledButtonText, SubTitle } from '../components/styles';
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
    useEffect(()=>{
        let responses = []
        for (let i = 0; i<3;i++){
            let q = questions.questions[i][0]
            let r = response[i]
            let adjust_r = 10-r[0]
            let x = decide(adjust_r,q.x.risk,q.x.warn,q.x.ave)
            let y = decide(r[1],q.y.risk,q.y.warn,q.y.ave)
            responses.push([q,x,y])
        }
        stats[0] = buildStats(responses)
        postResponses(responses)
        setCompleted()
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

    const buildStats = (responses)=>{
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
            return <StyledButton title = "Help" onPress={onPress}><StyledButtonText> Want help with this lab? </StyledButtonText></StyledButton>                 
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



    if (!loading){
        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey Completed</PageTitle>  
                    <SubTitle>You completed survey for lab {lab.lab.lab_number} for {lab.lab.course_id}. In this survey your response showed:  </SubTitle>
                    <ShowFlatList text = "Above Lab Average" data = {stats[0][0][0]}/>
                    <ShowFlatList text = "Below Lab Average" data = {stats[0][1][0]}/>
                        <ShowHelp/>
                        <StyledDoneButton title = "Home" onPress={onPress}><StyledButtonText> Return Home </StyledButtonText></StyledDoneButton>
                </ContentJustified>
            </View>
        )
    }


};
export default Done;