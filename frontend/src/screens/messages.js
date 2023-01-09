import React, { useState, useEffect, useContext} from 'react'
import { Button, FlatList, StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';

import { ContentJustified, PageTitle } from '../components/styles';
import   StyledMessage   from '../components/StyledMessage';

const Messages = ({navigation}) => {
    const { user } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState([])
    const [messages, setMessages] = useState([])

    useEffect( ()=>{
        fetchMessages();
        fetchUserInfo(); 
    },[])

    const fetchUserInfo = ()=>{
        const userUrl = `http://backend-production-94f0.up.railway.app/users/`+ user.user_id
        fetch(userUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setUserInfo(data)
        })
    }
    const fetchMessages = async ()=> {
        const messageUrl = `http://backend-production-94f0.up.railway.app/message/`+ user.user_id   
        const message_response = await fetch(messageUrl, {
            method : 'GET',
            headers :{
                'Content-Type' : 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setMessages(data)
        })
    }

    return (
        <View>
            <ContentJustified>
                <PageTitle>Messages</PageTitle> 
                <FlatList
                data={messages}
                renderItem ={({item})=>(
                    <StyledMessage
                     message = {item}
                     />
                )
                }/>

            </ContentJustified>
        </View>
    )
};
export default Messages;