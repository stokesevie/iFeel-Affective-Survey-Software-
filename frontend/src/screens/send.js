import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { TextInput,Alert } from 'react-native';

import { ContentJustified, PageTitle, StyledButton,StyledButtonText, StyledTextInputParagraph, SubTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';

const Send = ({route, navigation}) => {
    const { user } = useContext(AuthContext)
    const pastMessage =route.params.message.item
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState([])

    const handleSend = async () => {
        let data = {
            "sender_id": user.user_id, 
            "receiver_id": pastMessage.s_id,
            "message_content": message 
        }
            const sendUrl = `http://127.0.0.1:8000/messages/`
            let response = await fetch(sendUrl, {
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data),
            })
        setLoading(false)
        
    };

    if (!loading){
        Alert.alert('Message to '+ pastMessage.sender_f_name, 'Message sent!')
        return navigation.navigate("Messages")
    }else{

    return (
            <ContentJustified>
                <PageTitle>Sending message to {pastMessage.sender_f_name} {pastMessage.sender_l_name} </PageTitle> 
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
export default Send;