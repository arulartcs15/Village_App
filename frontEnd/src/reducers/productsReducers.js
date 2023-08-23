import { GET_PRODUCTS,CREATE_PRODUCT,EDIT_PRODUCT,SET_PRODUCT_ID,DESTROY_PRODUCT } from "../actions/productsActions"
const productInitialState = {
    data: [],
    editId:""
}

const productsReducers = (state = productInitialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            return { ...state, data: action.payload }
        }
        case CREATE_PRODUCT:{
            return { ...state,data:[...state.data,action.payload]}
        }
        case EDIT_PRODUCT:{
            return {...state,data:state.data.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
            })}}
            case SET_PRODUCT_ID:{
                return {...state,editId:action.payload}
            }
         case DESTROY_PRODUCT:{
            return {...state,data:state.data.filter(ele=>ele._id !== action.payload._id)}
         }
        default: {
            return { ...state }
        }
    }
}

export default productsReducers