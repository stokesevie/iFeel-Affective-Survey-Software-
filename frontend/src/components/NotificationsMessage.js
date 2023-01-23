import React, { useState } from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,ContentsNotification,Theme, StyledBubble, BubbleText, BubbleTextBold} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { View,Text } from "react-native";

export class NotificationsMessage extends React.Component {
    render(){
      const userInfo = this.props.userInfo

    return (
      <StyledBubble>
        <BubbleText>You have 3 messages since your last login ({userInfo.last_login}) Most recent message from <BubbleTextBold>{userInfo.first_name}</BubbleTextBold></BubbleText>
      </StyledBubble>
        
    );

    }  
  }
