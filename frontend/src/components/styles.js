
import styled from 'styled-components/native';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export const Theme = {
    text_light:'#B0BFF7', //neutral beige
    text_dark:'#D64C5A', //darker beige
    text_darker:'#340068', //dark beige
    primary:'#D64C5A', //light blue
    secondary:'#D64C5A', //dark blue
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
    justify-content: space-between;
    font-size: 25px;
    text-align: left;
    font-weight: bold;
    color: ${Theme.text_darker};
    padding-left: 5px;
`;
export const MessageContent = styled.Text`
    justify-content: space-between;
    font-size: 20px;
    text-align: left;
    color: ${Theme.text_darker};
    padding-left: 5px;
`;

export const MessageTime = styled.Text`
    justify-content: space-between;
    font-size: 10px;
    text-align: right;
    font-weight: bold;
    color: ${Theme.text_darker};
    padding: 10px;
`;

export const CourseDetail = styled.Text`
    font-size: 20px;
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

export const SenderTime = styled.View`
    display: flex;
`;

export const MessageObject = styled.View`
    justify-content: space-between;
`;

export const CourseTitle = styled.Text`
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    color: ${Theme.text_darker};
    padding: 10px;
`;


export const ContentJustified = styled.View`
    padding-left:10px;
    padding-right:10px;
    padding-top:40px;
    height:85.5%;
`;

export const ContentJustifiedBack = styled.View`
    padding-left:10px;
    padding-right:10px;
    padding-top:86px;
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
    padding: 25px;
    background-color: ${Theme.secondary};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    margin-vertical: 5px;
    height: 60px;
    padding-top: 10px;
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
    color: ${Theme.text_darker};
    text-align:center;
`;
export const ContentsNotification = styled.View`
    display: flex;
    flex-direction:row;
    justify-content: space-between;
`;

export const XYGrid = styled.View`
    width:80%;
    height:80%;
    border-width:2px;
    border-color: ${Theme.primary}};
    
`;

export const XYGridText = styled.Text`
    top:-10px;
    font-size:19px;
    color: ${Theme.text_darker};
    text-align:center;
`;

export const YText = styled.Text` 
    font-size:19px;
    color: ${Theme.text_darker};
    text-align:center;
    transform: rotate(90deg);
    left:160px;
    top:-155px;
`;



export const Grid = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height:60%;
`;

export const YTextMin = styled.Text` 
    font-size:19px;
    color: ${Theme.text_darker};
    text-align:center;
    transform: rotate(90deg);
    left:-160px;
    top:165px;
`;

export const SurveyQuestion = styled.Text` 
    font-size:19px;
    color: ${Theme.secondary};
    text-align: center
    padding: 10px
`;

export const StyledBubble = styled.TouchableOpacity`
    background-color: ${Theme.text_light};
    border-radius: 5px;
    height: 25%;
    margin-bottom: 20px;
`;

export const StyledBubbleLarge = styled.TouchableOpacity`
    background-color: ${Theme.text_light};
    border-radius: 5px;
    height: 50%;
    margin-bottom: 20px;
`;

export const BubbleText = styled.Text`
    font-size:22px;
    color: ${Theme.text_darker}
    padding: 5px;
    letter-spacing: 1px;
`;

export const BubbleTextBold = styled.Text`
    font-size:22px;
    color: ${Theme.text_darker}
    padding: 5px;
    letter-spacing: 1px;
    font-weight:bold;
`;
