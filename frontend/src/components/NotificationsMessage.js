import React from "react";
import { NotificationTitle,StyledNotification,NotificationText,Arrow ,ContentsNotification,Theme} from './styles'
import {Ionicons} from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { View,Text } from "react-native";

export class NotificationsMessage extends React.Component {
    render(){
      const userInfo = this.props.userInfo
    return (
        <Text>you have x messages. </Text>
    );

    }  
  }
