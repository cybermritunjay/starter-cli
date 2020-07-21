import * as actionTypes from './actionTypes'
import { store } from '../../common/store';
// import iid from 'react-native-firebase/iid'
import iid from '@react-native-firebase/iid'
import api from '../api';
import { Platform } from 'react-native';
const LoginAction = items => ({
    type: actionTypes.LOGIN,
    items,
});

const LogoutAction = () => ({
    type: actionTypes.LOGOUT,
});

export const logout = () => {
    store.dispatch(LogoutAction())
    return 'Success'
}

export const login = async (payload) => {

}

