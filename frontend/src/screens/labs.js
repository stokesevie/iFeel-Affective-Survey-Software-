import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const Labs = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from labs</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Labs;