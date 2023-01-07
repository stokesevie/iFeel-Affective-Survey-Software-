
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from "./utils/auth_context";


import { Ionicons } from '@expo/vector-icons'

import StudentDashboard from './screens/dashboard_student'
import Pending from './screens/pending'
import Messages from './screens/messages'
import Login from './screens/login'

import  localStorage from 'localstorage-polyfill'; 

import { Theme } from './components/styles'

const Stack = createNativeStackNavigator();
const NavBar = createBottomTabNavigator();
const colours = Theme;



function CreateTabs(){
    return(
        <NavBar.Navigator screenOptions={{
            tabBarActiveTintColor: colours.secondary,
            tabBarInactiveTintColor: colours.fourth
        }}>
            <NavBar.Screen name= "Home" component={StudentDashboard} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="home" color={color} size={25} />
              )}}/>
            <NavBar.Screen name= "Messages" component={Messages} options={{headerShown: false, tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-mail-outline" color={color} size={25} />
              )}}/>
            <NavBar.Screen name= "Labs" component={Pending} options={{headerShown: false, tabBarIcon: ({ color }) => (
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
                            <Stack.Screen name="StudentDashboard" component={CreateTabs} options={{ headerShown: false }}/>
                    </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>

    );
}

export default App;


