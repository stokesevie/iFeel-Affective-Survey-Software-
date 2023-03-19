import React from "react";
import { StyledButton,BubbleTextBold, ContentJustifiedBack, PageTitle, StyledBubble, SubTitle, BubbleText, CenterText, StyledButtonEdit, StyledButtonText, StickToBottom } from "../components/styles";
import { View } from "react-native";

/*
This screen allows the tutor to see the specific axis selected for surveys
*/

const QuestionEdit = ({route,navigation})=>{
    const question = route.params.question
    const course = route.params.course
    const questionNumber = route.params.questionNumber
    const lab = route.params.lab

        
    const refreshRequired = ()=>{
        try {
            return route.params.refresh
        }catch{
            return false
        }
    }

    const demo = ()=>{
        navigation.navigate("Demo",{question: question,lab:lab,questionNumber:questionNumber})
    }
    // console.log(`Editing Question ${questionNumber}`)


    return(
        <ContentJustifiedBack>
            <PageTitle testID= "page-title">Editing Question {questionNumber}</PageTitle>
            <SubTitle testID= "sub-title">{course} - {lab.lab.lab_title}(lab {lab.lab.lab_number})</SubTitle>
            <StyledBubble>
                <BubbleTextBold>Axis x: </BubbleTextBold>
                <View style={{height:43}}>
                    <CenterText><BubbleText testID= "x">{question.x.neg} - {question.x.pos}

                    </BubbleText></CenterText>
                </View>
  
                <StickToBottom>
            <StyledButtonEdit testID="edit-x" onPress = {()=>{
                let r = refreshRequired()
                navigation.navigate("EditAxis",{question :question, questionNumber:questionNumber,lab:lab,course:course,axis:'x',refresh:r})}}><StyledButtonText>Edit Axis</StyledButtonText></StyledButtonEdit>
            </StickToBottom>
            </StyledBubble>
            <StyledBubble>
                <BubbleTextBold>Axis y: </BubbleTextBold>
                <View style={{height:43}}>
                    <CenterText><BubbleText testID= "y">{question.y.neg} - {question.y.pos}{`\n`}
                    </BubbleText></CenterText>
                </View>
            <StickToBottom>
            <StyledButtonEdit testID="edit-y" onPress = {()=>{
                let r = refreshRequired()
                navigation.navigate("EditAxis",{question :question, questionNumber:questionNumber,lab:lab,course:course, axis:'y',refresh:r})}}><StyledButtonText>Edit Axis</StyledButtonText></StyledButtonEdit>
            </StickToBottom>
           
            </StyledBubble>
            <StyledButton testID= "see-demo" onPress={demo}><StyledButtonText>See Demo of this question</StyledButtonText></StyledButton>      

        </ContentJustifiedBack>
    )
}

export default QuestionEdit;