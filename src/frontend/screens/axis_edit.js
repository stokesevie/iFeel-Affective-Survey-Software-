import React,{useState} from "react";
import {  ContentJustifiedBack, PageTitle, Right, BubbleText,Left,Theme, StyledTextInput, AxisEditSubText, StyledButtonText, StyledDoneButton, TutorStudentFeedback, AxisEditButton, CenterText } from "../components/styles";
import { Ionicons } from '@expo/vector-icons';
import { View,Text } from "react-native";
import { useContext } from "react";
import AuthContext from '../utils/auth_context';
import { Alert } from "react-native";


/*
This screen allows the tutor to edit an axis
*/

const EditAxis = ({route,navigation})=>{
    const {question,course,questionNumber,lab,axis} = route.params
    let risk = ''+question[axis].risk
    let warning = ''+question[axis].warn
    let neg = question[axis].neg
    let pos = question[axis].pos
    const [changed,setChanged] = useState(false)
    const [loading,setLoading] = useState(false)
    const [posAxis,setPosAxis]= useState('')
    const [negAxis,setNegAxis]= useState('')
    const [riskZone,setRiskZone]= useState('')
    const [warningZone,setWarningZone]= useState('')
    const {url} = useContext(AuthContext)

    const access = JSON.parse(localStorage.getItem("authTokens"))['access']


    const updateAxis = ()=>{
       let changes = [posAxis,negAxis,riskZone,warningZone]
       let fieldTitle =['pos_title','neg_title','risk','warn']
       for (let i in changes){
        if (changes[i]!=''){
            let c;
            if (i>1){
              try{
                c = parseInt(changes[i])
              }catch{
                Alert.alert("Zones must be a number from 1-10, with warning zone being less than risk zone.")
                return
              }
            }else{
                c = changes[i]
            }
            let f = fieldTitle[i]
            
            let d =new Object()
            d[f]=c
            putChange(d,f)
        }
       }
       setLoading(true)
       navigation.navigate("QuestionsEdit",{lab:lab,course:course,refresh:true})
       setLoading(false)
    }

    const createAxis = ()=>{
        navigation.navigate("NewAxis",{axis:axis,question:question,course:course,lab:lab,questionNumber:questionNumber})
    }

    const putChange = async (change)=>{
     
        const axisUrl = url+`/axis_labels/${question[axis].id}/`
        const update = await fetch(axisUrl, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${access}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(change)
          });
        let r = update.status
    }
   

    if (!loading){
        return(
            <ContentJustifiedBack>
                <PageTitle>Editing axis {axis} for question {questionNumber}</PageTitle>
                <CenterText><AxisEditSubText>{course}: {lab.lab_title}{`\n`}</AxisEditSubText>
                <AxisEditSubText>Type to edit parts of the axis{`\n`}</AxisEditSubText></CenterText>
    
                <AxisEditSubText>Positive axis title:</AxisEditSubText>
                <TextInput icon={'create-outline'}  placeholder={pos} placeholderTextColor={Theme.text_darker} onChangeText= {text => setPosAxis(text)} clearTextOnFocus={true} autoFocus={true}></TextInput>
                <AxisEditSubText>Negative axis title:</AxisEditSubText>
                <TextInput icon={'create-outline'} placeholder={neg} placeholderTextColor={Theme.text_darker} onChangeText= {text => setNegAxis(text)}></TextInput>
                <BubbleText>These zones are marked on a scale of 1-10. 1 is closest to positive axis title, {pos} in this case, 10 is closest to negative axis or {neg} in this case.{`\n`}</BubbleText>
                <AxisEditSubText>Risk zone:</AxisEditSubText>
                <TextInput icon={'create-outline'}  zone={'-10'} placeholder={risk} placeholderTextColor={Theme.text_darker} onChangeText= {text => setRiskZone(text)}></TextInput>
                <AxisEditSubText>Warning zone:</AxisEditSubText>
                <TextInput icon={'create-outline'}  zone={' -'+risk} placeholder={warning} placeholderTextColor={Theme.text_darker} onChangeText= {text => setWarningZone(text)}></TextInput>
                <View style={{ flexDirection:"row",justifyContent:'space-between' }}>
                <AxisEditButton onPress={updateAxis}><StyledButtonText>Save</StyledButtonText></AxisEditButton>
                <AxisEditButton onPress={createAxis}><StyledButtonText>Create new axis</StyledButtonText></AxisEditButton>
                </View>
            </ContentJustifiedBack>
        )
    }
   

    
};

const TextInput = ({zone,label, icon, ...props}) =>{
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

export default EditAxis;