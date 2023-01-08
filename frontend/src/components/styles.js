
import styled from 'styled-components/native';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export const Theme = {
    text_light:'#FCDFA6', //neutral beige
    text_dark:'#F4B886', //darker beige
    text_darker:'#F18831', //dark beige
    primary:'#5C898A', //light blue
    secondary:'#3A606E', //dark blue
    third: 'white', // white
    fourth: 'grey', // white
};

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${Theme.primary};
    padding: 10px;
`;

export const StyledMessage = styled.View`
    padding: 15px;
    background-color: ${Theme.secondary};
    border-radius: 5px;
    height: 120px;
    margin-bottom: 20px;
`;

export const MessageSender = styled.Text`
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    color: ${Theme.primary};
    padding: 10px;
`;
export const MessageContent = styled.Text`
    font-size: 10px;
    text-align: center;
    font-weight: bold;
    color: ${Theme.primary};
    padding: 10px;
`;

export const MessageTime = styled.Text`
    font-size: 10px;
    text-align: center;
    font-weight: bold;
    color: ${Theme.primary};
    padding: 10px;
`;

export const CourseDetail = styled.Text`
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    color: ${Theme.text_darker};
    padding: 10px;
`;

export const StyledListButton = styled.TouchableOpacity`
    padding: 1px;
    background-color: ${Theme.text_light};
    border-radius: 5px;
    height: 120px;
    margin-bottom: 20px;
`;


export const ContentJustified = styled.View`
    padding-left:10px;
    padding-right:10px;
    padding-top:30px;
    margin:10px;
    height:85.5%;
`;


export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;


export const StyledTextInput = styled.TextInput`
    background-color: ${Theme.text_light};
    color: ${Theme.text_darker};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    
`;

export const StyledInputLabel = styled.Text`
    color: ${Theme.secondary};
    font-size: 15px;
    font-weight:bold;
    text-align: left;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${Theme.secondary};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    margin-vertical: 5px;
    height: 60px;
`;

export const StyledButtonText = styled.Text`
    color: ${Theme.third};
    font-size:19px;
    font-weight: bold;
    
`;

export const RightIcon = styled.TouchableOpacity`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const Logo = styled.Image`
    margin-left:auto;
    margin-right:auto;
    width: 250px;
    height: 200px;
`;

export const NotificationsSurvey = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${Theme.secondary};
    border-radius: 5px;
    height: 120px;
    margin-bottom: 20px;
`;

export const SubTitle= styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: black;
    text-align:center;
`;
export const ContentsNotification = styled.View`
    display: flex;
    flex-direction:row;
    justify-content: space-between;
`;



