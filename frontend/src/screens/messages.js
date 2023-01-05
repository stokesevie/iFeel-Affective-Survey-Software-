import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const Messages = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from messages</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Messages;