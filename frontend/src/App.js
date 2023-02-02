
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from "./utils/auth_context";


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

import  localStorage from 'localstorage-polyfill'; 

import { Theme } from './components/styles'

const Stack = createNativeStackNavigator();
const NavBar = createBottomTabNavigator();
const colours = Theme;



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
        </NavBar.Navigator>
    );
}

export function CreateTabsTutor(){
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
            <NavBar.Screen name= "Courses" component={Courses} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="school" color={color} size={25} />
              ),}}/>
        </NavBar.Navigator>
    );
}
function App() {
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
                    </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>

    );
}

export default App;


