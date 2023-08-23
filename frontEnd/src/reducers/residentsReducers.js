import { GET_RESIDENTS,CREATE_RESIDENT,EDIT_RESIDENT,DESTROY_RESIDENT,GET_ONE_RESIDENT,SET_RESIDENT_ID} from "../actions/residentsActions"

const residentInitialState = {
    data: [],
    editId:""
}

const residentsReducers = (state = residentInitialState, action) => {
    switch (action.type) {
        case GET_RESIDENTS: {
            return { ...state, data: action.payload }
        }
        case CREATE_RESIDENT: {
            return { ...state,data:[...state.data,action.payload]}
        }
        case EDIT_RESIDENT:{
            return {...state,data:state.data.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
            })}
        }
        case DESTROY_RESIDENT:{
            return {...state,data:state.data.filter(ele=>ele._id !== action.payload._id)}
            
        }
        case GET_ONE_RESIDENT :{
            return {...state,data:action.payload}
           }
        case SET_RESIDENT_ID :{
         return {...state,editId:action.payload}
        }
        default: {
            return { ...state }
        }
    }
}

export default residentsReducers