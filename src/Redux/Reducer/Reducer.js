import { combineReducers } from 'redux'

// const tasks = (state = '', action) => {
//     switch (action.type) {
//         case 'TASKS':
//             return action.payload
//         case 'SUBMIT': 
//             return ''
//         default:
//             return state
//     }
// }

const user = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state;
    }
}

const newItem = (state = '', action) => {
    switch(action.type){
        case 'ITEMS':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const itemImage = (state = '', action) => {
    switch(action.type){
        case 'IMAGE':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const itemPrice = (state = '', action) => {
    switch(action.type){
        case 'PRICE':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const holiday = (state = '', action) => {
    switch(action.type){
        case 'HOLIDAY':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

export default combineReducers({ user, newItem, itemPrice, holiday, itemImage })