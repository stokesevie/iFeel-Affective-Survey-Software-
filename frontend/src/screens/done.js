import React, { useState, useEffect } from 'react'
import {View,Text} from 'react-native'

import { BubbleText, DoneTextBold, ContentJustified, PageTitle, StyledBubbleLarge, StyledButton,StyledButtonText, SubTitle } from '../components/styles';

/* This is the end screen for the survey. This will show the performance of the student in relation to the zones laid out by 
the backend of the database. This will then use these marks to offer the student to message their tutor. It will also add the current 
score to the average */


const Done = ({route, navigation}) => {
    const { lab,response,questions } = route.params
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
        setLoading(false)
        

    })

    const buildStats = (responses)=>{
        let good = []
        let bad = []
        for (let i = 0; i<3; i++){
            if (responses[i][1]!= "GOOD" && responses[i][1]!="AVERAGE"){
                let s = [responses[i][1], " You reported yourself to find this lab "+ responses[i][0].x.neg+ "."]
                bad.push(s)
            }else{
                let s = [responses[i][1], " You reported yourself to find this lab "+ responses[i][0].x.pos+ "."]
                good.push(s)
            }
            if (responses[i][2]!= "GOOD" && responses[i][2]!="AVERAGE"){
                let s = [responses[i][2], " You reported yourself to find this lab "+ responses[i][0].y.neg+ "."]
                bad.push(s)
            } else{
                let s = [responses[i][2] , " You reported yourself to find this lab "+ responses[i][0].y.pos+ "."]
                good.push(s)
            }
        }
        return [[good],[bad]]
    }

    const StatsText = (stats)=>{
        let s = stats.stats[0]
        let colours = {"GOOD": '#33a244', "AVERAGE":'#340068', "WARNING": '#e69a11', "RISK": '#d33c19'}
        let returnedText = []
        for (let i in s){
            if (s[i][0]=="GOOD"){
                returnedText.push(<Text style={{fontWeight:'bold', color: colours["GOOD"]}}>{s[i][0]}</Text>)
                returnedText.push(<Text>{s[i][1]}{'\n'}</Text>)

            }else if (s[i][0]=="AVERAGE"){
                returnedText.push(<Text style={{fontWeight:'bold', color: colours["AVERAGE"]}}>{s[i][0]}</Text>)
                returnedText.push(<Text>{s[i][1]}{'\n'}</Text>)
            }else if (s[i][0]=="WARNING"){
                returnedText.push(<Text style={{fontWeight:'bold', color: colours["WARNING"]}}>{s[i][0]}</Text>)
                returnedText.push(<Text>{s[i][1]}{'\n'}</Text>)
            } else {
                returnedText.push(<Text style={{fontWeight:'bold', color: colours["RISK"]}}>{s[i][0]}</Text>)
                returnedText.push(<Text>{s[i][1]}{'\n'}</Text>)
            }
        }
        return returnedText
    }

    const postResponses = ()=>{

    }

    if (!loading){
        return (
            <View>
                <ContentJustified>
                    <PageTitle>Survey Completed</PageTitle>  
                    <SubTitle>You completed survey for lab {lab.lab.lab_number} for {lab.lab.course_id}. In this survey your response showed:  </SubTitle>
                    <BubbleText>
                        <DoneTextBold>
                            Above Lab Average:{'\n'}
                        </DoneTextBold> 
                        <StatsText stats={stats[0][0]}></StatsText>
                        {'\n'}
                        <DoneTextBold>
                            Below Lab Average:{'\n'}
                        </DoneTextBold>
                        <StatsText stats={stats[0][1]}></StatsText>
                        </BubbleText>
                        <StyledButton title = "Home" onPress={onPress}><StyledButtonText> Return Home </StyledButtonText></StyledButton>
                </ContentJustified>
            </View>
        )
    }


};
export default Done;