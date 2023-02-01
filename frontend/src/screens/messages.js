import React, { useState, useEffect, useContext} from 'react'
import { Button, FlatList, StyleSheet, Text, View} from 'react-native'
import AuthContext from '../utils/auth_context';

import { ContentJustified, PageTitle } from '../components/styles';
import   StyledMessage   from '../components/StyledMessage';

const Messages = ({navigation}) => {
    const { user,userInfo,messages } = useContext(AuthContext);


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