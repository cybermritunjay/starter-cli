import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'


//import Screens
import LoginScreen from '../../screens/Login/login'

const StackNavigator = createStackNavigator()

const AuthNavigation = () => {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <StackNavigator.Screen component={LoginScreen} name="login" />
        </StackNavigator.Navigator>
    )
}

export default AuthNavigation