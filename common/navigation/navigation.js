import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

//import AuthNavigator from './authNavigator'
import MainNavigator from './mainNavigator'

const Navigator = () => {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    )
}
export default Navigator