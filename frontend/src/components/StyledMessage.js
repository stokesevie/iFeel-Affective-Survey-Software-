import React, {Component} from 'react';
import { Text,View } from 'react-native';
import { MessageSender,MessageTime,MessageContent, StyledListButton } from './styles';

export default function StyledMessage(props){
    const {message} = props
    return(
            <StyledListButton>
                <MessageSender>{message.sender_id}</MessageSender>
                <MessageTime>{message.sent_at}</MessageTime>
                <MessageContent>{message.message}</MessageContent>
            </StyledListButton>
            

        )
}

