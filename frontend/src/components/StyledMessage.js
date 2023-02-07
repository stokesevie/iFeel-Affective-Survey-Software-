import React, {useState} from 'react';
import { MessageSender,MessageTime,MessageContent, StyledListButton, SenderTime, MessageObject } from './styles';

export default function StyledMessage(props){
    const {message,onPress} = props

    let dt = (message.sent_at).split("T")
    let d = dt[0].split("-")
    let t = (dt[1].replace("Z","")).split(":")

        return(

            <StyledListButton onPress={onPress}>
                <SenderTime>
                        <MessageObject>
                                <MessageTime>{d[0]}/{d[1]}/{d[2]} - {t[0]}:{t[1]}</MessageTime>
                        </MessageObject>
                        <MessageObject>
                                <MessageSender>{message.sender_f_name} {message.sender_l_name} ({message.sender_id})</MessageSender>
                        </MessageObject> 
               </SenderTime>
                <MessageContent>{message.message_content}</MessageContent>
            </StyledListButton>
            

        )

    
}

