import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const Done = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from done</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Done;