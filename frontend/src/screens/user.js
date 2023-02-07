
import React, { useState, useEffect, useContext } from 'react'
import {View,Text} from 'react-native'

import { BubbleText, DoneTextBold, ContentJustified, PageTitle, StyledBubbleLarge, StyledButton,StyledButtonText, SubTitle } from '../components/styles';
import AuthContext from '../utils/auth_context';
import moment from '../node_modules/moment'

const User = ({route, navigation}) => {
    const {user,setAuthTokens,setUser,setUserInfo} = useContext(AuthContext)
    var date = moment()
    .format('YYYY-MM-DD HH:mm:ss');
    date += '+00:00'

    const updateUserLastLogin = async ()=>{
        let d = {"last_login" : date}
        let url = `http://backend-production-94f0.up.railway.app/users/${user.user_id}/`
        const update = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(d)
          });
        let r = update.status
        
    }    
        return (
            <View>
                <ContentJustified>
                    <PageTitle>User Home</PageTitle>  
                    <SubTitle>Log out?</SubTitle>
                    <StyledButton onPress={()=>{
                        updateUserLastLogin()
                        setAuthTokens(null)
                        setUser(null)
                        setUserInfo(null)
                        localStorage.clear()
                        navigation.navigate("Login")
                        }}><StyledButtonText>Log out</StyledButtonText></StyledButton>
                </ContentJustified>
            </View>
        )
    }

export default User;