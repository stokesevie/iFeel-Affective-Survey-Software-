import React, {Component, useEffect, useState} from 'react';
import { Text,View } from 'react-native';
import { MessageSender,MessageTime,MessageContent, StyledListButton, SenderTime, MessageObject } from './styles';

export default function StyledMessage(props){
    const {message} = props
    const [sender, setSender] = useState([])

    let dt = (message.sent_at).split("T")
    let d = dt[0].split("-")
    let t = (dt[1].replace("Z","")).split(":")
    const fetchSender = async ()=>{
        const userUrl = `http://backend-production-94f0.up.railway.app/sender/`+ message.sender_id
        response = await fetch(userUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setSender(data)})
    }

    useEffect(()=>{
        fetchSender()
    },[])

    return(
            <StyledListButton>
                <SenderTime>
                        <MessageObject>
                                <MessageTime>{d[0]}/{d[1]}/{d[2]} - {t[0]}:{t[1]}</MessageTime>
                        </MessageObject>
                        <MessageObject>
                                <MessageSender>{sender.first_name}</MessageSender>
                        </MessageObject> 
               </SenderTime>
                <MessageContent>{message.message}</MessageContent>
            </StyledListButton>
            

        )
}

