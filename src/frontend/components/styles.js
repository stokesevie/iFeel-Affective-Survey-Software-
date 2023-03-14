
import styled from 'styled-components/native';

export const Theme = {
    text_light:'#B0BFF7', //bubble colours
    text_dark:'#dd6e79', //dark pink
    text_darker:'#340068', //colour for bubbles
    primary:'#D64C5A', //dark pink
    secondary:'#D64C5A', //dark pink
    third: 'white', // white
    fourth: 'grey', // white
    fifth: '#DB616D' //lighter pink than the main colour
};

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${Theme.primary};
    padding: 10px;
`;

export const Profile = styled.View`
    margin-left:0px;
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
    padding: 5px;
`;

export const RelatedLab = styled.Text`
    font-size: 15px;
    text-align: right;
    font-weight: bold;
    color: ${Theme.primary};
    padding: 5px;
`;

export const StyledListButton = styled.TouchableOpacity`
    padding: 5px;
    background-color: ${Theme.text_light};
    border-radius: 5px;
    margin-bottom: 8px;
`;

export const AxisListButton = styled.TouchableOpacity`
    padding: 1px;
    background-color: ${Theme.text_light};
    border-radius: 5px;
    height: 150px;
    margin-bottom: 8px;
`;

export const StyledListButtonC = styled.TouchableOpacity`
    padding: 3px;
    background-color: ${Theme.text_light};
    border-color:${Theme.primary};
    border-radius: 5px;
    border-width:5px;
    margin-bottom: 8px;
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
    padding: 5px;
`;


export const ContentJustified = styled.View`
    padding-left:10px;
    padding-right:10px;
    padding-top:40px;
    height:90%;
`;

export const ContentJustifiedBack = styled.View`
    padding-left:10px;
    padding-right:10px;
    padding-top:86px;
    height:95%;
`;


export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;
export const Left = styled.View`
    left: 15px;
    top: 17px;
    position: absolute;
    z-index: 1;
`;
export const Right = styled.View`
    left: 325px;
    top: 23px;
    position: absolute;
    z-index: 1;
`;


export const StyledTextInput = styled.TextInput`
    background-color: ${Theme.text_light};
    color: ${Theme.primary};
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

export const StyledTextInputParagraph = styled.TextInput`
    background-color: ${Theme.text_light};
    color: ${Theme.text_darker};
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    height: 150px;
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

export const StyledButtonEdit = styled.TouchableOpacity`
    background-color: ${Theme.secondary};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    height: 60px;
    margin:5px;
    top:30px;
`;

export const StickToBottom = styled.View`
    justify-content: flex-end;
    display: flex;
    height:60px;

`;


export const StyledButtonTutor = styled.TouchableOpacity`
    padding: 25px;
    background-color: ${Theme.secondary};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    margin-vertical: 5px;
    height: 100px;
`;

export const StyledDoneButton = styled.TouchableOpacity`
    background-color: ${Theme.secondary};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    margin-vertical: 5px;
    height: 60px;
    padding-bottom: 10px;
`;

export const TutorStudentFeedback = styled.TouchableOpacity`
    height: 60px;
    background-color: ${Theme.secondary};
    justify-content:center;
    border-radius: 5px;
    margin:5px;
    padding:5px;

`;

export const AxisEditSubText = styled.Text`
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${Theme.text_darker};

`;

export const AxisEditButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${Theme.secondary};
    justify-content:center;
    border-radius: 5px;
    margin:5px;
    padding:20px;

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
    margin-bottom: 10px;
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

export const Cell = styled.TouchableOpacity`
    width:10%;
    height:150%;
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

export const StyledBubble = styled.View`
    background-color: ${Theme.text_light};
    border-radius: 5px;
    height: 28%;
    margin-bottom: 10px;
    display: flex;

`;

export const StyledBubbleLarge = styled.View`
    background-color: ${Theme.text_light};
    border-radius: 5px;
    height: 50%;
    margin-bottom: 10px;
`;

export const BubbleText = styled.Text`
    font-size:18px;
    color: ${Theme.text_darker}
    padding: 5px;
    letter-spacing: 1px;

`;

export const ResponseText = styled.Text`
    font-size:18px;
    color: ${Theme.text_darker}
    padding: 0px;
    text-align:center;

`;


export const Center = styled.TouchableOpacity`
    margin-left:45%;
    margin-top:2%;
`;

export const CenterText = styled.Text`
text-align:center;
`;

export const BubbleTextBold = styled.Text`
    font-size:22px;
    color: ${Theme.text_darker}
    padding: 5px;
    letter-spacing: 1px;
    font-weight:bold;
`;

export const DoneTextBold = styled.Text`
    font-size:22px;
    color: ${Theme.text_darker}
    letter-spacing: 1px;
    font-weight:bold;
    text-align:center;
`;
