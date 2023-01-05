import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const Survey = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from survey</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Survey;