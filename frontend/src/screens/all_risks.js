import { ContentJustified, PageTitle, SubTitle,StyledListButton,BubbleText,BubbleTextBold, StyledButton, StyledButtonText } from "../components/styles"
import { Text ,FlatList} from "react-native";
import { useEffect, useState,useContext } from "react";
import AuthContext from '../utils/auth_context';

const AllRisks = ({route,navigation})=>{

    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const student = route.params.student
    const [loading,setLoading] = useState(true)
    const [risks,setRisks] = useState()
    const {url} = useContext(AuthContext)

    useEffect(()=>{
        if (loading){
        fetchStudentRisks()
        }
    },[loading])

    const Risk=({item})=>{
        if (item.risk){
            return (<><BubbleTextBold>{item.axis_neg}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{color:'red',fontWeight:'bold'}}>risk zone</Text> as defined by tutor axis.</Text></>)
        }else if (item.warning){
            return (<><BubbleTextBold>{item.axis_neg}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{color:'#e69a11',fontWeight:'bold'}}>warning zone</Text> as defined by tutor axis.</Text></>)
        }else if(item.avg){
            return (<><BubbleTextBold>{item.axis_pos}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{fontWeight:'bold'}}>average zone</Text> as defined by tutor axis.</Text></>)
        }
    }

    const fetchStudentRisks = async ()=>{
        const recentUrl = url+`/student_lab_risks/${student}/`
        const recent_response = await fetch(recentUrl, {
            method : 'GET',
            headers :{
              'Authorization' :`Bearer ${access}`, 
              'Content-Type' : 'application/json',
            },
        })
        let r = await recent_response.json()
        setRisks(r)
    }


    if (risks){
    return (<ContentJustified>
        <PageTitle>All Student Risks:</PageTitle>
        <SubTitle>{risks[0].student_name}</SubTitle>
        <SubTitle>Tap a lab to send a message regarding a specific risk</SubTitle>
        <FlatList
        data={risks}
        renderItem={({item})=>{
            return (<StyledListButton onPress={()=>{
                navigation.navigate("SendNew",{receiver_id:risks[0].student_id,lab:item})}}>
                <BubbleText>{item.course_name} : lab {item.lab_number}</BubbleText>
                <BubbleText><Risk item = {item}/></BubbleText>
            </StyledListButton>)
        }}/>
        </ContentJustified>)
}}

export default AllRisks;