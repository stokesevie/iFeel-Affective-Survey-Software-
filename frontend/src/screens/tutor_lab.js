import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import AuthContext from '../utils/auth_context';


import { BubbleText, BubbleTextBold, CenterText, ContentJustifiedBack, PageTitle, StyledBubble, StyledButton, StyledButtonText, StyledButtonTutor, StyledListButton, SubTitle } from '../components/styles';


const TutorLab = ({route,navigation}) => { 
    const { url } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [risks,setRisks] = useState([])
    const {lab} = route.params.lab
    const course = route.params.course
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']


    const fetchStudentRisks = async ()=>{
        const lab_risk = url+`/student_lab_risks/lab/${lab.lab_id}/`
            let response = await fetch(lab_risk, {
                method : 'GET',
                headers :{
                    'Authorization' :`Bearer ${access}`, 
                    'Content-Type' : 'application/json',
                    'Accept':'application/json',
                  },
            }).catch(console.error)

            let api_r = await response.json().catch(error=>{})
            setRisks(api_r)
            setLoading(false)
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
                if ((risks[r].student_first_name +" "+risks[r].student_last_name) == students[i]){
                    found = true
                }
            }
            if (!found){
                students.push(risks[r].student_first_name +" "+risks[r].student_last_name)
            }
        }
        return students
    }

    const NoStudents = (students)=>{
        if (JSON.stringify(students.s)=="[]"){
            return (<CenterText><BubbleText>No students have taken this survey</BubbleText></CenterText>)
        }
    }

    if (!loading){
        let students = uniqueStudents()

        return (
            <View>
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
                        if ((risks[i].student_first_name + " " +risks[i].student_last_name) == item){
                            relatedRisks.push(risks[i])
                            if (risks[i].risk){
                                countRisks =+ 1
                            }else if (risks[i].warning){
                                countWarnings =+1
                            }
                        }
                        }
                        let worstRisk = relatedRisks[0]
                         if (worstRisk.risk){
                            return (<StyledListButton onPress ={()=>{navigation.navigate("StudentRisk",{relatedRisks: relatedRisks})}}>
                                <BubbleText><BubbleTextBold>{worstRisk.student_first_name} {worstRisk.student_last_name}{`\n`}
                               </BubbleTextBold>
                                <BubbleTextBold><Text style ={{color:'red'}}>RISK</Text></BubbleTextBold> on {worstRisk.axis_neg} axis</BubbleText>
                                <BubbleText><BubbleTextBold>{countRisks}</BubbleTextBold> other risks and <BubbleTextBold>{countWarnings}</BubbleTextBold> warnings</BubbleText>
                                </StyledListButton>)
                        }else if (worstRisk.warning){
                            return (<StyledListButton onPress ={()=>{navigation.navigate("StudentRisk",{relatedRisks: relatedRisks})}}>
                                <BubbleText>{worstRisk.student_first_name} {worstRisk.student_last_name}</BubbleText>
                                <BubbleTextBold><Text style ={{color:'#e69a11'}}>WARNING</Text></BubbleTextBold>
                                </StyledListButton>)
                      
                        }else if (worstRisk.avg){
                            return (<StyledListButton onPress ={()=>{navigation.navigate("StudentRisk",{relatedRisks: relatedRisks})}}>
                                <BubbleText>{worstRisk.student_first_name} {worstRisk.student_last_name}</BubbleText>
                                <BubbleTextBold><Text style ={{color:'#e69a11'}}>WARNING</Text></BubbleTextBold>
                                </StyledListButton>)
                      
                        }
                    }
                    }
                    >

                    </FlatList>
                </ContentJustifiedBack>
            </View>
        )
    }

};
export default TutorLab;

