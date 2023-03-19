import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import AuthContext from '../utils/auth_context';
import { ActivityIndicator } from 'react-native';


import { BubbleText, BubbleTextBold, CenterText, ContentJustifiedBack, PageTitle, StyledBubble, StyledButton, StyledButtonText, StyledButtonTutor, StyledListButton, SubTitle } from '../components/styles';


const TutorLab = ({route,navigation}) => { 
    const { url } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [risks,setRisks] = useState([])
    const labDetail = route.params.lab
    const {lab} = route.params.lab
    const course = route.params.course
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    
    const fetchStudentRisks = async ()=>{
        const lab_risk = url+`/student_lab_risks/lab/${lab.lab_id}/${labDetail.tutor_teaching_id}/`
            let response = await fetch(lab_risk, {
                method : 'GET',
                headers :{
                    'Authorization' :`Bearer ${access}`, 
                    'Content-Type' : 'application/json',
                    'Accept':'application/json',
                  },
            }).then(data=>data.json())
            .then(data=>{
                setRisks(data)
                setLoading(false)
            }).catch(error=>{})

    }


    useEffect(()=>{
        if (loading){
            fetchStudentRisks()
        }
    },[loading])

    const uniqueStudents = ()=>{
        let students = []
        
        for (let r in risks){
            let found = false
            for (let i in students){
                if (risks[r].student_id == students[i][0]){
                    found = true
                }
            }
            if (!found){
                students.push([risks[r].student_id,risks[r].student_first_name +" "+risks[r].student_last_name])
            }
        }
        return students
    }

    const NoStudents = (students)=>{
        if (JSON.stringify(students.s)=="[]"){
            return (<CenterText><BubbleText>No students have taken this survey</BubbleText></CenterText>)
        }
    }


    const AddFlag = (flag)=>{
        if (flag.flag){
            return (<Text style={{color:'red'}}> FLAGGED </Text>)
        }
    }


    if (!loading){
        let students = uniqueStudents()
        return (
                <ContentJustifiedBack>
                    <PageTitle>{lab.lab_title}</PageTitle>  
                    <StyledButtonTutor onPress={()=>{navigation.navigate("QuestionsEdit",{lab: route.params.lab, course: course})}}><CenterText><StyledButtonText>Press here to make changes to this lab survey</StyledButtonText></CenterText></StyledButtonTutor>
                    <SubTitle>Students responses</SubTitle>
                    <NoStudents s={students}/>
                    <FlatList
                    data={students}
                    renderItem ={({item})=>{
                        let relatedRisks = []
                        let countRisks =0
                        let countWarnings = 0
                        for(let i in risks){
                            if ((risks[i].student_id) == item[0]){
                                relatedRisks.push(risks[i])
                                if (risks[i].risk){
                                    countRisks = countRisks+ 1
                                }else if (risks[i].warning){
                                    countWarnings = countWarnings+1
                                }
                            }
                        }
                        let worstRisk = relatedRisks[0]
                        let headerText = worstRisk.student_first_name + ' ' + worstRisk.student_last_name
                        if (worstRisk.risk){
                            return (<StyledListButton onPress ={()=>{navigation.navigate("StudentRisk",{relatedRisks: relatedRisks,teaching_id :labDetail.tutor_teaching_id,labDetail:labDetail})}}>
                                <BubbleText><BubbleTextBold>{headerText}<AddFlag flag={worstRisk.flag}/>{`\n`}</BubbleTextBold>
                                <BubbleTextBold><Text style ={{color:'red'}}>RISK</Text></BubbleTextBold> on {worstRisk.axis_neg} axis</BubbleText>
                                <BubbleText><BubbleTextBold>{countRisks-1}</BubbleTextBold> other risks and <BubbleTextBold>{countWarnings}</BubbleTextBold> warnings</BubbleText>
                                </StyledListButton>)
                        }else if (worstRisk.warning){
                            return (<StyledListButton onPress ={()=>{navigation.navigate("StudentRisk",{relatedRisks: relatedRisks,teaching_id :labDetail.tutor_teaching_id,labDetail:labDetail})}}>
                                    <BubbleText><BubbleTextBold>{headerText}<AddFlag flag={worstRisk.flag}/>{`\n`}
                               </BubbleTextBold>
                                <BubbleTextBold><Text style ={{color:'#e69a11'}}>WARNING</Text></BubbleTextBold> on {worstRisk.axis_neg} axis</BubbleText>
                                <BubbleText><BubbleTextBold>{countWarnings-1}</BubbleTextBold> other warnings</BubbleText>
                                </StyledListButton>)
                      
                        }
                    }
                    }
                    >

                    </FlatList>
                </ContentJustifiedBack>
        )
    }else{
        return(
            <ContentJustifiedBack>
            <ActivityIndicator testID='loading-indicator' visible={loading} color='black' style={{flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                paddingTop: 30,
                padding: 8,}}/>
                </ContentJustifiedBack>
          )
    }

};
export default TutorLab;

