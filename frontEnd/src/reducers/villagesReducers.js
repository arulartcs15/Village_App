import { GET_VILLAGE,CREATE_VILLAGE,EDIT_VILLAGE,DESTROY_VILLAGE } from "../actions/villagesActions"
const villageInitialState = {
    data: {}
}

const villagesReducers = (state = villageInitialState, action) => {
    switch (action.type) {
        case GET_VILLAGE: {
            return { ...state, data: action.payload }
        }
        case CREATE_VILLAGE: {
            return { ...state, data:action.payload}
        }
        case EDIT_VILLAGE:{
            return {...state,data:action.payload}
            
         }
        case DESTROY_VILLAGE :{
            return {...state,data:action.payload}
            
        }
        default: {
            return  state
        }
    }
}

export default villagesReducers