import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import { BubbleText, BubbleTextBold, ContentJustified, PageTitle, StyledButton, StyledButtonText, StyledListButton, SubTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';

const StudentRisk = ({route,navigation})=>{
    const relatedRisks = route.params.relatedRisks

    const Risk=({item})=>{
        if (item.risk){
            return (<><BubbleTextBold>{item.axis_neg}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{color:'red',fontWeight:'bold'}}>risk zone</Text> as defined by your axis.</Text></>)
        }else if (item.warning){
            return (<><BubbleTextBold>{item.axis_neg}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{color:'#e69a11',fontWeight:'bold'}}>warning zone</Text> as defined by your axis.</Text></>)
        }else if(item.avg){
            return (<><BubbleTextBold>{item.axis_pos}</BubbleTextBold><Text>{`\n`}This student is in <Text style={{fontWeight:'bold'}}>average zone</Text> as defined by your axis.</Text></>)
        }
    }

    return (<ContentJustified>
        <PageTitle>{relatedRisks[0].student_first_name} {relatedRisks[0].student_last_name}</PageTitle>
        <SubTitle>{relatedRisks[0].lab_title} lab risks</SubTitle>
        <StyledButton onPress={()=>{
                navigation.navigate("AllRisks", {student: relatedRisks[0].student_id})}}><StyledButtonText>See all student risks</StyledButtonText></StyledButton>
        <FlatList
        data={relatedRisks}
        renderItem={({item})=>{
            return (<StyledListButton>
                <BubbleText><Risk item = {item}/></BubbleText>
            </StyledListButton>)
        }}
        ></FlatList></ContentJustified>)
}

export default StudentRisk;