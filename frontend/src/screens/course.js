import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const Course = ({route, navigation}) => {
    const { course } = route.params
    const courseDetail = course.courseDetail
    return (

        <View>
            
            <ContentJustified>
                <PageTitle>Hello from {courseDetail.title}</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Course;