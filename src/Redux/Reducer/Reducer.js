import { combineReducers } from 'redux'

const tasks = (state = '', action) => {
    switch (action.type) {
        case 'TASKS':
            return action.payload
        case 'SUBMIT': 
            return ''
        default:
            return state
    }
}

export default combineReducers({ tasks })