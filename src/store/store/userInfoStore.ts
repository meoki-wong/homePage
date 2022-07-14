import { userInfoReducer } from "../reducer";
import {createStore, combineReducers} from 'redux'
import { persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'
const persistConfig = {
      key: 'root',
      storage: storageSession, // 存在session
      // whitelist: ['navigation'] // navigation会存入缓存，其他不会存，适用于大多数数据并不会实时从后台拿数据
      blacklist: [] // 不做持久化的数据
    };
const reducers = combineReducers({
        depReducer: persistReducer(persistConfig, userInfoReducer)
     });
export const persistor = persistStore(createStore(reducers))
export default createStore(reducers)