
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudentDashboard from './screens/dashboard_student'

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="StudentDashboard" component={StudentDashboard}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
