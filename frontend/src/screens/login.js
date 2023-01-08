import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View} from 'react-native'

import { ContentJustified, PageTitle } from '../components/styles';

const Login = ({navigation}) => {
    return (
        <View>
            <ContentJustified>
                <PageTitle>Login</PageTitle>  
            </ContentJustified>
        </View>
    )
};
export default Login;