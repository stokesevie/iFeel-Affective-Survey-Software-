import React from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,ContentsNotification,Theme, StyledBubbleLarge, BubbleText} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { View,Text } from "react-native";

export class NotificationsAlert extends React.Component {
    render(){
      const userInfo = this.props.userInfo
    return (
        <StyledBubbleLarge>
        <BubbleText>You found this weeks lab harder than the average student </BubbleText>
        </StyledBubbleLarge>
    );
    }  
  }
