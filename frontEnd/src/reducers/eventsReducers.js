import { GET_EVENTS,CREATE_EVENT,EDIT_EVENT,SET_EVENT_ID,DESTROY_EVENT} from "../actions/eventsActions"
const eventInitialState = {
    data: [],
    editId:""
}

const eventsReducers = (state = eventInitialState, action) => {
    switch (action.type) {
        case GET_EVENTS: {
            return { ...state,data:action.payload }
        }
        case CREATE_EVENT:{
            return { ...state,data:[...state.data,action.payload]}
            }
        case EDIT_EVENT:{
            return {...state,data:state.data.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
            })}}
            case SET_EVENT_ID:{
                return {...state,editId:action.payload}
            }
         case DESTROY_EVENT:{
            return {...state,data:state.data.filter(ele=>ele._id !== action.payload._id)}
         }
        default: {
            return { ...state }
        }
    }
}

export default eventsReducers