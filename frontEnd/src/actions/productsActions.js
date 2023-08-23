import axios from '../config/axios'
import Swal from 'sweetalert2'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const EDIT_PRODUCT ="EDIT_PRODUCT"
export const SET_PRODUCT_ID ="SET_PRODUCT_ID"
export const DESTROY_PRODUCT ="DESTROY_PRODUCT"

export const getProducts = (data) => {
    return {
        type: GET_PRODUCTS,
        payload: data
    }
}


export const asyncGetProducts = (id) => {
    return (dispatch) => {
        axios.get(`/api/allproducts/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(getProducts(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
 

//create

export const createProduct = (data) => {
    return {
        type:CREATE_PRODUCT,
        payload: data
    }
  }
  
  export const asyncCreateProduct = (formData, reset) => {
    return (dispatch) => {
        axios.post('/api/products', formData, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
              const result = response.data
             if(result.hasOwnProperty('price')){
               dispatch(createProduct(result))
                reset()
              }
              else{
                Swal.fire(result)
                reset()
              }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
  }
  
  
  //update 
  
   export const editProduct = (data) => {
    return {
        type:EDIT_PRODUCT,
        payload: data
    }
  }
  
  export const asyncEditProduct = (formData, reset,id) => {
    return (dispatch) => {
        axios.put(`/api/products/${id}`, formData, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(editProduct(result))
                reset()
               })
            .catch((err) => {
                alert(err.message)
            })
    }
  }
  
  //GET EditId
  
  export const setEditProductId=(id)=>{
    return{
      type:SET_PRODUCT_ID,
      payload:id
    }
  }
  
  export const asyncSetEditProductId=(id)=>{
     return(dispatch)=>{
      ( async()=>{ 
      try{
        if(id){
       const product =await axios.get(`/api/products/${id}`,{headers: { 'authorization': localStorage.getItem('token') } })
          dispatch(setEditProductId(product.data._id))
        }
        else{
          dispatch(setEditProductId(''))
        }

      }catch(e){
        console.log(e.message)
      }
      })()
     
    }
  }
  
  
  
  //Delete
  
  export const destroyProduct = (data) => {
    return {
        type: DESTROY_PRODUCT,
        payload: data
    }
  }
  
  export const asyncDestroyProduct = (id) => {
    return (dispatch) => {
        axios.delete(`/api/products/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(destroyProduct(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
  }
  