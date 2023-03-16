import React, { useState, useEffect, useContext } from 'react'
import { Text} from 'react-native'
import { Alert } from 'react-native';
import moment from 'moment/moment';

import { ContentJustified, PageTitle, StyledButton,StyledButtonText, StyledTextInputParagraph, MessageObject,MessageContent,MessageSender,MessageTime,Theme, RelatedLab, BubbleText, SubTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';


/*
This screen allows the user to send a message
*/
const Send = ({route, navigation}) => {
    const { user,url } = useContext(AuthContext)
    const pastMessage =route.params.message.item
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState([])
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']

    let dt = (pastMessage.sent_at).split(" ")
    let d = dt[0].split("-")
    let t = (dt[1].split(".")[0]).split(":")



    const CheckIfTutor = ()=>{
        if (pastMessage.staff){
          return (<Text style={{color:Theme.primary, fontSize:18}}> Tutor</Text>)
        }
      }


    const handleSend = async () => {
        let date = moment()
        .format('YYYY-MM-DD HH:mm:ss');
        date += '+00:00'
        let data;
        if (pastMessage.related_lab){
            data = {
            "sender_id": user.user_id, 
            "receiver_id": pastMessage.s_id,
            "message_content": message,
            "related_lab":pastMessage.related_lab
        }}else{
            data = {
                "sender_id": user.user_id, 
                "receiver_id": pastMessage.s_id,
                "message_content": message 
            }
        }
            const sendUrl = url+`/messages/`
            let response = await fetch(sendUrl, {
                method : 'POST',
                headers :{
                    'Authorization' :`Bearer ${access}`, 
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

    const Related = ()=>{
        if (pastMessage.related_lab){
            return (<RelatedLab>Related to {pastMessage.related_lab_title}({pastMessage.related_lab_course_title}) </RelatedLab>)
        }
    }

        return(
            <ContentJustified>
                 <MessageObject>
                 <PageTitle>{pastMessage.sender_f_name} {pastMessage.sender_l_name} </PageTitle> 
                                <MessageTime>{d[0]}/{d[1]}/{d[2]} - {t[0]}:{t[1]}</MessageTime>
                                <Related/>
                        </MessageObject>
                        <CheckIfTutor/> 
                        <MessageObject>
                                <MessageSender>{pastMessage.sender_f_name} {pastMessage.sender_l_name}({pastMessage.sender_id})</MessageSender>
                        </MessageObject> 
                        <MessageContent>{pastMessage.message_content}</MessageContent>
                        <SubTitle>Reply below</SubTitle>
                <StyledTextInputParagraph
                    editable
                    multiline
                    value={message}
                    onChangeText={(val) => setMessage(val)}>
                        
                </StyledTextInputParagraph>
                <StyledButton onPress = {handleSend}><StyledButtonText>Send</StyledButtonText></StyledButton>

              
            </ContentJustified>
    )
    
};
export default Send;