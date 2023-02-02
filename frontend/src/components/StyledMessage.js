import React, {Component, useEffect, useState} from 'react';
import { Text,View } from 'react-native';
import { MessageSender,MessageTime,MessageContent, StyledListButton, SenderTime, MessageObject } from './styles';

export default function StyledMessage(props){
    const {message} = props
    const [sender, setSender] = useState([])
    const [fetched, setFetched] = useState(false)

    let dt = (message.sent_at).split("T")
    let d = dt[0].split("-")
    let t = (dt[1].replace("Z","")).split(":")
    const fetchSender = async ()=>{
        const userUrl = `http://127.0.0.1:8000/sender/`+ message.sender_id
        response = await fetch(userUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setSender(data)}).catch(console.error)

        setFetched(true)
    }

    useEffect(()=>{
        fetchSender()
    },[])

    if (fetched){
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

    
}

