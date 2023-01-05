import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { NavBar } from '../components/NavBar'
import { ContentJustified, PageTitle } from '../components/styles';

const StudentDashboard = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Hello from dashboard student</PageTitle>  
                <NavBar navigation = {navigation}/>
            </ContentJustified>
        </View>
    )
};
export default StudentDashboard;