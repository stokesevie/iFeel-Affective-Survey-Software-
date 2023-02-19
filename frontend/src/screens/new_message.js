import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { TextInput,Alert } from 'react-native';

import { ContentJustified, PageTitle, StyledButton,StyledButtonText, StyledTextInputParagraph, MessageObject,MessageContent,MessageSender,MessageTime,Theme, SubTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';

const SendNew = ({route, navigation}) => {
    const { user } = useContext(AuthContext)
    const receiver_id =route.params.receiver_id
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState([])



    const handleSend = async () => {
        let data = {
            "sender_id": user.user_id, 
            "receiver_id": receiver_id,
            "message_content": message 
        }
            const sendUrl = `http://127.0.0.1:8000/messages/`
            let response = await fetch(sendUrl, {
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data),
            }).catch(console.error)

            let r = response.statusText
            await r
            setLoading(false)
            
        
    };

    if (!loading){
        Alert.alert('Message to '+ receiver_id + 'Message sent!')
        return navigation.navigate("Messages")
    }else{
        return(
            <ContentJustified>
                <SubTitle> Message to Tutor for course {route.params.lab}</SubTitle>
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