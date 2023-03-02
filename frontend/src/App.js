
import React, { useEffect,useState,useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthContext from './utils/auth_context'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { AuthProvider } from "./utils/auth_context";

import localStorage from 'localstorage-polyfill'; 

import { Ionicons } from '@expo/vector-icons'

import StudentDashboard from './screens/dashboard_student'
import Courses from './screens/courses'
import Messages from './screens/messages'
import Login from './screens/login'
import Course from './screens/course';
import Survey from './screens/survey'
import SurveyLab from './screens/surveyLab'
import Done from './screens/done';
import TutorDashboard from './screens/dashboard_tutor';
import Pending from './screens/pending';
import Send from './screens/send';
import SendNew from './screens/new_message';
import User from './screens/user';
import TutorCourses from './screens/tutor_courses';
import TutorCourse from './screens/tutor_course';
import TutorLab from './screens/tutor_lab';
import StudentRisk from './screens/student_risk';
import AllRisks from './screens/all_risks';
import QuestionsEdit from './screens/questions_edit';
import QuestionEdit from './screens/question_edit';
import EditAxis from './screens/axis_edit';
import NewAxis from './screens/new_axis';
import Demo from './screens/demo';

import { Theme } from './components/styles'



const Stack = createNativeStackNavigator();
const NavBar = createBottomTabNavigator();
const colours = Theme;


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });  

Notifications.scheduleNotificationAsync({
    content: {
      title: 'Look at that notification',
      body: "I'm so proud of myself!",
    },
    trigger: null,
  });

const registerForPushNotificationsAsync = async()=>{
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //alert(token);
    } else {
    }
return token
}

const CreateTabsStudent =()=> {
    return(
        <NavBar.Navigator
            screenOptions={{
            tabBarActiveTintColor: colours.secondary,
            tabBarInactiveTintColor: colours.fourth
        }}>
            <NavBar.Screen name= "Home" component={StudentDashboard} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="home" color={color} size={25} />
              )}}/>
            <NavBar.Screen name= "Messages" component={Messages} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-mail-outline" color={color} size={25} />
              )}}/>
            <NavBar.Screen name= "Courses" component={Courses} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="school" color={color} size={25} />
              ),}}/>
            <NavBar.Screen name= "Profile" component={User} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="person-outline" color={color} size={25} />
              ),}}/>
        </NavBar.Navigator>
    );
}

 function CreateTabsTutor(){
    
    return(
        <NavBar.Navigator screenOptions={{
            tabBarActiveTintColor: colours.secondary,
            tabBarInactiveTintColor: colours.fourth
        }}>
            <NavBar.Screen name= "Home" component={TutorDashboard} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="home" color={color} size={25} />
              )}}/>
            <NavBar.Screen name= "Messages" component={Messages} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-mail-outline" color={color} size={25} />
              )}}/>
            <NavBar.Screen name= "Courses" component={TutorCourses} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="school" color={color} size={25} />
              ),}}/>
            <NavBar.Screen name= "Profile" component={User} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="person-outline" color={color} size={25} />
              ),}}/>
        </NavBar.Navigator>
    );
}
8
function App() {
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(()=>{
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    })
            return (
                <AuthProvider>
                    <NavigationContainer>
                            <Stack.Navigator>
                                    <Stack.Screen name="Login"component={Login} options={{ headerShown: false }} />
                                    <Stack.Screen name="StudentDashboard" component={CreateTabsStudent} options={{ headerShown: false }}/>
                                    <Stack.Screen name="TutorDashboard" component={CreateTabsTutor} options={{ headerShown: false }}/>
                                    <Stack.Screen name="Course" component={Course} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name="Survey" component={Survey} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name="SurveyLab" component={SurveyLab} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name="Done" component={Done} options={{ headerShown: false }}/>
                                    <Stack.Screen name="Pending" component={Pending} options={{ headerShown: false }}/>
                                    <Stack.Screen name="Send" component={Send} options={{ presentation:'modal',headerShown:false }}/>
                                    <Stack.Screen name="SendNew" component={SendNew} options={{ presentation:'modal',headerShown:false }}/>
                                    <Stack.Screen name="Profile" component={User} options={{ presentation:'modal',headerShown:false }}/>
                                    <Stack.Screen name="TutorCourses" component={TutorCourses} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name="TutorCourse" component={TutorCourse} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name="TutorLab" component={TutorLab} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name="StudentRisk" component={StudentRisk} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name="AllRisks" component={AllRisks} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name= "QuestionsEdit" component={QuestionsEdit} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name= "QuestionEdit" component={QuestionEdit} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name= "EditAxis" component={EditAxis} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name= "NewAxis" component={NewAxis} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                                    <Stack.Screen name= "Demo" component={Demo} options={{ title:'' ,headerTransparent: true, headerTintColor:colours.primary }}/>
                            </Stack.Navigator>
                    </NavigationContainer>
                </AuthProvider>
        
            )
    }

    

export default App;


