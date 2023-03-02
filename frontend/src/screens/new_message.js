import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { TextInput,Alert } from 'react-native';
import moment from 'moment/moment';

import { ContentJustified, PageTitle, StyledButton,StyledButtonText, StyledTextInputParagraph, MessageObject,MessageContent,MessageSender,MessageTime,Theme, SubTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';


/*
This screen allows the user to send a new message
*/
const SendNew = ({route, navigation}) => {
    const { user,url } = useContext(AuthContext)
    const receiver_id = route.params.receiver_id
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState([])
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    
    const isLab = ()=>{
        try {  
            return route.params.lab
        }catch{
            return null
        }
    }

    const lab = isLab()

    const handleSend = async () => {
        let data;
        let lab = isLab()
        let date = moment()
        .format('YYYY-MM-DD HH:mm:ss');
        date += '+00:00'
        if (lab){
            data = {
                "related_lab": lab,
                "sender_id": user.user_id, 
                "receiver_id": receiver_id,
                "message_content": message,
                "sent_at": date,
            }
        }else{
            data = {
                "sender_id": user.user_id, 
                "receiver_id": receiver_id,
                "message_content": message,
                "sent_at": date,
            }
        }

            const sendUrl = url+`/messages/`
            let response = await fetch(sendUrl, {
                method : 'POST',
                headers :{
                    'Authorization': `Bearer ${access}`,
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data),
            }).catch(console.error)

            let r = response.statusText
            await r
            setLoading(false)
            
        
    };

    useEffect(()=>{
        if (!loading){
        Alert.alert('Message sent!')
        return navigation.navigate("Messages")
        }
    },[loading])


    if (user.is_staff && lab){
        return (
            <ContentJustified>
            <SubTitle><Text style={{fontWeight:'1'}}> Message to {lab.student_name} regarding </Text>{lab.course_name}: {lab.lab_title} (lab {lab.lab_number})<Text style={{fontWeight:'1'}}> on {lab.axis_neg} axis</Text></SubTitle>
            <StyledTextInputParagraph
                editable
                multiline
                value={message}
                onChangeText={(val) => setMessage(val)}>
                    
            </StyledTextInputParagraph>
            <StyledButton onPress = {handleSend}><StyledButtonText>Send</StyledButtonText></StyledButton>

          
        </ContentJustified>
        )
    }else{
        let t= 'tutor'
        if (route.params.tutor_name){
            t = t+ ' '+route.params.tutor_name
        }
        return(
            <ContentJustified>
                <SubTitle> Message to {t} for course {route.params.course}</SubTitle>
                <StyledTextInputParagraph
                    editable
                    multiline
                    value={message}
                    onChangeText={(val) => setMessage(val)}>
                        
                </StyledTextInputParagraph>
                <StyledButton onPress = {handleSend}><StyledButtonText>Send</StyledButtonText></StyledButton>

              
            </ContentJustified>
    )
        }
    
};
export default SendNew;