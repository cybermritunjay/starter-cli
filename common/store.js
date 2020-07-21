import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import rootReducer from '../services/reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
}
const middlewares = [thunk]


const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)

