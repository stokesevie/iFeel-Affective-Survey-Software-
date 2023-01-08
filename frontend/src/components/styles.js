
import styled from 'styled-components/native';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export const theme = {
    text_light:'#FCDFA6', //neutral beige
    text_dark:'#F4B886', //darker beige
    primary:'#6A898A', //light blue
    secondary:'#3A606E', //dark blue
    third: '#CCCCCC', // grey
};

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${theme.primary};
    padding: 10px;
`;

export const ContentJustified = styled.View`
    padding-left:10px;
    padding-right:10px;
    padding-top:30px;
    margin:10px;
    height:85.5%;
`;
