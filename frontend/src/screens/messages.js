import React, { useState, useEffect, useContext} from 'react'
import { Button, FlatList, StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';

import { ContentJustified, PageTitle } from '../components/styles';
import   StyledMessage   from '../components/StyledMessage';

/*
This screen shows the messages the user has received
*/

const Messages = ({navigation}) => {
    const { messages } = useContext(AuthContext);

    return (
            <ContentJustified>
                <PageTitle>Messages</PageTitle> 
                <FlatList
                data={messages}
                renderItem ={({item})=>(
                    <StyledMessage
                     message = {item}
                     onPress={()=>{
                        navigation.navigate("Send",{message:{item}})
                     }}
                     />
                )
                } />

            </ContentJustified>
    )
};
export default Messages;