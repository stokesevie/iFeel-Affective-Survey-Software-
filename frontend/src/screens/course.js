import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { CreateTabs } from '../App';

import { ContentJustified, PageTitle } from '../components/styles';

const Course = ({navigation}) => {
    return (
        <View>
            
            <ContentJustified>
                <PageTitle>Hello from pending</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Course;