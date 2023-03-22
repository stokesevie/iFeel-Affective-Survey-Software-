import React,{useState,useContext} from "react";
import {  ContentJustifiedBack, PageTitle, StyledButton, Right, BubbleText,Left,Theme, StyledTextInput, AxisEditSubText, StyledButtonText, StyledDoneButton, TutorStudentFeedback, AxisEditButton, CenterText } from "../components/styles";
import { Ionicons } from '@expo/vector-icons';
import { View,Text } from "react-native";
import { useEffect } from "react";
import AuthContext from "../utils/auth_context";
import { Alert } from "react-native";


/*
This screen allows the tutor to create a new
*/
const NewAxis = ({route,navigation})=>{
    const  lab  = route.params.lab
    const  course  = route.params.course
    const [posAxis,setPosAxis]= useState('')
    const [negAxis,setNegAxis]= useState('')
    const [riskZone,setRiskZone]= useState('')
    const [warningZone,setWarningZone]= useState('')
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const [question,setQuestion] = useState()
    const [newS, setNewS]= useState(false)
    const [loading, setLoading]= useState(true)
    const [postBoth, setPostBoth] = useState()
    const axis = route.params.axis
    const questionNumber = route.params.questionNumber
    const {url} = useContext(AuthContext)

    useEffect(()=>{
        if (loading){
            if (route.params.question){
                const question = route.params.question
                setQuestion(question)
            }else{
                setNewS(true)
            }
        }
    },[loading])
   

    const postAxis = async ()=>{
        try{
            if (parseInt(riskZone)>parseInt(warningZone)){
            }else{
                throw(error)
            }
        }catch{
            Alert.alert("Zones must be a number from 1-10, with warning zone being less than risk zone.")
            return
        }
        try{
            if (posAxis.length>0 && posAxis.length<25 && negAxis.length>0 && negAxis.length<25){

            }else{
                throw error
            }
        }catch{
            Alert.alert("Axis titles must be shorter than 25 characters","This ensures that the axis title fits on the grid")
            return
        }
        let a = {
            'pos_title':posAxis,
            'neg_title':negAxis,
            'risk':parseInt(riskZone),
            'warn': parseInt(warningZone),
        }
        const axisUrl = url+`/axis_labels/`
        const update = await fetch(axisUrl, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${access}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(a)
          });

        let r = await update.json().catch(error=>{});
        let axis_id = r.id;
        
        
        if (newS){
            createNew(axis_id)
        }else{
            putAxis(axis_id)
        }
        setPosAxis('')
        setNegAxis('')
        setRiskZone('')
        setWarningZone('')


    }

    const createNew = (axis_id)=>{
        let post = new Object()
        post[axis] = axis_id
        if (axis!="x"){
            if (typeof postBoth!="undefined"){
                postQuestion(postBoth.x,post.y)
            }
        }else{
            setPostBoth(post)
            navigation.navigate("NewAxis",{axis:'y',question:question,course:course,lab:lab, questionNumber:questionNumber})
        }
        
    }

    const putAxis = async (axis_id)=>{
        let post = new Object()
        post[axis] = axis_id

        const questionUrl = url+`/question/${question.question_id}/`
        const put = await fetch(questionUrl, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${access}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
          });

          let q = await put.json()
          let questionID = q.id
          navigation.navigate("QuestionsEdit",{course:course,lab:lab,refresh:true,questionSet:true,questionNumber:questionNumber,questionID:questionID})

    }

    const postQuestion = async (x,y)=>{
        let post = {
            'x':x,
            'y':y,
        }
        const questionUrl = url+`/question/`
        const postQuestion = await fetch(questionUrl, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${access}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
          });

          let q = await postQuestion.json()
          let questionID = q.id
          navigation.navigate("QuestionsEdit",{course:course,lab:lab,refresh:true,questionSet:true,questionNumber:questionNumber,questionID:questionID})


    }

    if(!newS){
        return(          <ContentJustifiedBack>
            <PageTitle>Create new axis</PageTitle>
            <CenterText>
            <AxisEditSubText>Type to edit parts of the axis{`\n`}</AxisEditSubText></CenterText>

            <AxisEditSubText>Positive axis title:</AxisEditSubText>
            <TextInput icon={'create-outline'}  placeholder='Positive axis title' placeholderTextColor={Theme.fifth} value = {posAxis} onChangeText= {text => setPosAxis(text)} clearTextOnFocus={true} autoFocus={true}></TextInput>
            <AxisEditSubText>Negative axis title:</AxisEditSubText>
            <TextInput icon={'create-outline'} placeholder='Negative axis title' placeholderTextColor={Theme.fifth} value = {negAxis} onChangeText= {text => setNegAxis(text)}></TextInput>
            <BubbleText>These zones are marked on a scale of 1-10. 1 is closest to positive axis title, 10 is closest to negative axis title. {`\n`}</BubbleText>
            <AxisEditSubText>Risk zone:</AxisEditSubText>
            <TextInput zone={'-10'} icon={'create-outline'}  placeholder='Risk' placeholderTextColor={Theme.fifth} value = {riskZone} onChangeText= {text => setRiskZone(text)}></TextInput>
            <AxisEditSubText>Warning zone:</AxisEditSubText>
            <TextInput zone={'-risk'} icon={'create-outline'}  placeholder='Warning' placeholderTextColor={Theme.fifth} value = {warningZone} onChangeText= {text => setWarningZone(text)} ></TextInput>
            <StyledButton onPress={postAxis}><StyledButtonText>Save</StyledButtonText></StyledButton>
        </ContentJustifiedBack>)
    }else{
        return(
            <ContentJustifiedBack>
                <PageTitle>Create new axis</PageTitle>
                <CenterText>
                <AxisEditSubText>Question {route.params.questionNumber}: Axis {route.params.axis}{`\n`}
                Type to create the axis{`\n`}</AxisEditSubText></CenterText>

                <AxisEditSubText>Positive axis title:</AxisEditSubText>
                <TextInput icon={'create-outline'}  placeholder='Positive axis title' placeholderTextColor={Theme.fifth} value = {posAxis} onChangeText= {text => setPosAxis(text)} clearTextOnFocus={true} autoFocus={true}></TextInput>
                <AxisEditSubText>Negative axis title:</AxisEditSubText>
                <TextInput icon={'create-outline'} placeholder='Negative axis title' placeholderTextColor={Theme.fifth} value = {negAxis} onChangeText= {text => setNegAxis(text)}></TextInput>
                <BubbleText>These zones are marked on a scale of 1-10. 1 is closest to positive axis title, 10 is closest to negative axis title. {`\n`}</BubbleText>
                <AxisEditSubText>Risk zone:</AxisEditSubText>
                <TextInput zone={'-10'} icon={'create-outline'}  placeholder='Risk' placeholderTextColor={Theme.fifth} value = {riskZone} onChangeText= {text => setRiskZone(text)}></TextInput>
                <AxisEditSubText>Warning zone:</AxisEditSubText>
                <TextInput zone={'-risk'} icon={'create-outline'}  placeholder='Warning' placeholderTextColor={Theme.fifth} value = {warningZone} onChangeText= {text => setWarningZone(text)}></TextInput>
                <StyledButton onPress={postAxis}><StyledButtonText>Save</StyledButtonText></StyledButton>
            </ContentJustifiedBack>
        )
    }
   

    
}

const TextInput = ({label, icon, zone, ...props}) =>{

    const ShowZone =()=>{
        if (zone){
            return (<Right><Text style={{fontSize: 16,
                fontWeight: 'bold',color:Theme.fifth}}>{zone}</Text></Right>)
        }
    }
    return(
      <View>
        <Left>
          <Ionicons name={icon} size={30} color={Theme.primary}/>
        </Left>
        <ShowZone></ShowZone>
        <StyledTextInput {...props}/>
      </View>
    )
  }


export default NewAxis;