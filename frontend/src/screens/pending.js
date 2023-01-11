import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';
import { useContext } from 'react';
import AuthContext from '../utils/auth_context';

const Pending = ({navigation}) => {
    const { user,userInfo } = useContext(AuthContext);
    if (userInfo.is_staff){
        return navigation.navigate("TutorDashboard")
    } else{
        return navigation.navigate("StudentDashboard", {userInfo :{userInfo}})
    }
};
export default Pending;