import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const Pending = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from pending</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Pending;