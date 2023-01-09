
import { useContext, useState } from "react";
import AuthContext  from "../utils/auth_context"
import { View,Text, StyledForm, Button} from "react-native";
import { ContentJustified, PageTitle, StyledInputLabel, StyledTextInput,StyledButton, StyledButtonText,Logo , LeftIcon,RightIcon} from "../components/styles";
import { Formik } from "formik";
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Theme } from '../components/styles';

const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser } = useContext(AuthContext);
    
    const handleSubmit = e => {
        e.preventDefault();
        loginUser(username, password,navigation);   

    };

  
    return (
        <ContentJustified>
            <PageTitle>Login</PageTitle>
            <Logo resizeMode="cover" source={require('../assets/icon.png')} />
            <Formik>
                <View>
                <TextInput
                label="Matric Number/ Username"
                icon ="mail"
                value={username}
                onChangeText= {text => setUsername(text)}
                placeholderTextColor={Theme.text_dark}
                placeholder= "1234567a"
                />    
                <TextInput
                label="Password"
                icon ="lock"
                value={password}
                onChangeText= {text => setPassword(text)}
                isPassword={true}
                placeholderTextColor={Theme.text_dark}
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
          <Octicons name={icon} size={30} color={Theme.primary}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props}/>
        {isPassword && (
          <RightIcon>
            <Ionicons size={30} colour={Theme.primary}/>
          </RightIcon>
        )}
      </View>
    )
  }

  

  export default Login;