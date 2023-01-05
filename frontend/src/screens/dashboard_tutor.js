import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const TutorDashboard = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from dashboard tutor</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default TutorDashboard;