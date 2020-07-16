import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/drawer'

//import Screens
import HomeScreen from '../../screens/Home/home'
import AuthNavigator from './authNavigator'
const DrawerNavigator = createDrawerNavigator()

const MainNavigation = () => {
    return (
        <DrawerNavigator.Navigator
            drawerType='slide'
            //initialRouteName={initialRouteName}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <DrawerNavigator.Screen component={HomeScreen} name="home" />
            <DrawerNavigator.Screen component={AuthNavigator} name="Auth" />
        </DrawerNavigator.Navigator >
    )
}

export default MainNavigation