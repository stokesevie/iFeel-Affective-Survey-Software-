import React from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,ContentsNotification,Theme,StyledBubble, BubbleText} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { View,Text } from "react-native";
import StyledMessage from "./StyledMessage";

export class NotificationsSurvey extends React.Component {
    render(){
      const userInfo = this.props.userInfo
    return (
      <StyledBubble>
        <BubbleText>You have surveys to complete for 3 courses. </BubbleText>
      </StyledBubble>
        
    );

    }  
  }
