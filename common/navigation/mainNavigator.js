import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/drawer'

//import Screens
import HomeScreen from '../../screens/Home/home'
const DrawerNavigator = createDrawerNavigator()

const MainNavigation = () => {
    const initialRouteName = "login"
    return (
        <DrawerNavigator.Navigator
            drawerType='slide'
            //initialRouteName={initialRouteName}
            drawerContent={props => <CustomDrawer {...props} />}
        >

            <DrawerNavigator.Screen component={HomeScreen} name="home" />
        </DrawerNavigator.Navigator >
    )
}

export default MainNavigation