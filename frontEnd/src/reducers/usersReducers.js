import {CREATE_USER,ACCOUNT_DETAILS,GET_ADMIN,EDIT_ADMIN,DELETE_ADMIN,PERMANENT_DELETE_ADMIN} from '../actions/usersActions'
const userInitialState = {
     userDetails:{},
     data :[],
    }

const usersReducers = (state = userInitialState, action) => {
    switch (action.type) {
        case  CREATE_USER:{
            return {...state,data:[...state.data,action.payload] }
        }
        case ACCOUNT_DETAILS :{
                return {...state,userDetails:action.payload }
        }
         case GET_ADMIN :{
            return {...state,data:action.payload}
         }
         case EDIT_ADMIN :{
            return {...state,data:state.data.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
            })}}

         case  DELETE_ADMIN :{
            return {...state,data:state.data.map((ele)=>{
                if(ele._id == action.payload._id){
                        return {...ele,...action.payload}
                }
                else{
                   return  {...ele}
                }
            })}}
        
            case PERMANENT_DELETE_ADMIN:{
                return {...state,data:state.data.filter(ele=>ele._id !== action.payload._id)}
            }
        
        default: {
            return { ...state }
        }
    }
}

export default usersReducers