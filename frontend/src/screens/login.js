
import { useContext, useState, useEffect } from "react";
import AuthContext  from "../utils/auth_context"
import { View,Text, StyledForm, Button} from "react-native";
import { ContentJustified, PageTitle, StyledInputLabel, StyledTextInput,StyledButton, StyledButtonText,Logo , LeftIcon,RightIcon} from "../components/styles";
import { Formik } from "formik";
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../components/styles';


const Login = ({route,navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser,user,userInfo } = useContext(AuthContext);
  
    
    const handleSubmit = e => {
        e.preventDefault();
        loginUser(username, password,navigation).then(()=>{setUsername()
          setPassword()}); 
    };


    const updateDetails = async ()=>{
      if (typeof userInfo != undefined){
        try{
          let u = user
          return navigation.navigate("Pending", {userInfo : {userInfo}})
        }catch(error){
          alert("Failed to log in")
          return navigation.navigate("Login")
        }
      }

    }

    useEffect(()=>{
      updateDetails()},[userInfo])
  
    return (
        <ContentJustified>
            <PageTitle>Login</PageTitle>
            <Logo resizeMode="cover" source={require('../assets/icon_home.png')} />
            <Formik>
                <View>
                <TextInput
                label="Matric Number/ Username"
                icon ="person-outline"
                value={username}
                onChangeText= {text => setUsername(text)}
                placeholderTextColor={Theme.text_darker}
                placeholder= "1234567a"
                autoCapitalize='none'
                />    
                <TextInput
                label="Password"
                icon ="lock-closed-outline"
                value={password}
                onChangeText= {text => setPassword(text)}
                isPassword={true}
                placeholderTextColor={Theme.text_darker}
                placeholder="Password"
                autoCapitalize='none'
                secureTextEntry
                /> 
            <StyledButton onPress={handleSubmit}><StyledButtonText>Log in</StyledButtonText></StyledButton>
            </View>
          </Formik>
      </ContentJustified>
    );
  };

  const TextInput = ({label, icon, isPassword, ...props}) =>{
    return(
      <View>
        <LeftIcon>
          <Ionicons name={icon} size={30} color={Theme.text_darker}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props}/>
        {isPassword}
      </View>
    )
  }

  

  export default Login;