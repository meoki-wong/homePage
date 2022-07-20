import { getMessageCount } from '../reducer/index'
import {createStore} from 'redux'


export default createStore(getMessageCount)