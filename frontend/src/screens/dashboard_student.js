import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContentJustified, PageTitle } from '../components/styles';

const StudentDashboard = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from dashboard student</PageTitle>  
           </ContentJustified>
        </View>
    )
};
export default StudentDashboard;