import React, {useState} from 'react';
import { Text } from 'react-native';
import { MessageSender,MessageTime,MessageContent, StyledListButton, SenderTime, MessageObject } from './styles';
import { Theme } from './styles';

export default function StyledMessage(props){
    const {message,onPress} = props

    let dt = (message.sent_at).split("T")
    let d = dt[0].split("-")
    let t = (dt[1].replace("Z","")).split(":")

    const CheckIfTutor = ()=>{
        if (message.staff){
          return (<Text style={{color:Theme.primary, fontSize:18}}> Tutor</Text>)
        }
      }

    const MessageShortened = (message)=>{
        message = message.message
        let msg = message;
        if (message.length>36){
            msg = message.substr(0, 36)+"..."
        }
        return <MessageContent>{msg}</MessageContent>

    }
        return(

            <StyledListButton onPress={onPress}>
                <SenderTime>
                        <MessageObject>
                                <MessageTime>{d[0]}/{d[1]}/{d[2]} - {t[0]}:{t[1]}</MessageTime>
                        </MessageObject>
                        <CheckIfTutor/> 
                        <MessageObject>
                                <MessageSender>{message.sender_f_name} {message.sender_l_name}({message.sender_id})</MessageSender>
                        </MessageObject> 
                        <MessageShortened message={message.message_content}></MessageShortened>
               </SenderTime>
                
            </StyledListButton>
            

        )

    
}

