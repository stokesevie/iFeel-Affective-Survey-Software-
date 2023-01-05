
import styled from 'styled-components/native';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export const theme = {
    text_light:'#FBD1A2', //neutral beige
    text_dark:'#F79256', //darker beige
    primary:'#00B2CA', //light blue
    secondary:'#1D4E89', //dark blue
    third: '#7DCFB6', // green blue
};

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${theme.text_dark};
    padding: 10px;
`;

export const ContentJustified = styled.View`
    padding-left:10px;
    padding-right:10px;
    padding-top:30px;
    margin:10px;
    height:85.5%;
`;
