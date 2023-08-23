import axios from '../config/axios'
import Swal from 'sweetalert2'
export const GET_VILLAGE = 'GET_VILLAGE'
export const CREATE_VILLAGE = 'CREATE_VILLAGE'
export const EDIT_VILLAGE = 'EDIT_VILLAGE'
export const DESTROY_VILLAGE = 'DESTROY_VILLAGE'

export const getVillage = (data) => {
    return {
        type: GET_VILLAGE,
        payload: data
    }
}


export const asyncGetVillage = (id) => {
    
   return (dispatch) => {
        axios.get(`/api/village/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
               
                dispatch(getVillage(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


//creation of village


export const createVillage = (data) => {
    return {
        type: CREATE_VILLAGE,
        payload: data
    }
}

export const asyncCreateVillage = (formData, reset) => {
    return (dispatch) => {
        axios.post('/api/village', formData, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(createVillage(result))
                reset()
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


//update of village

export const editVillage = (data) => {
   return {
        type: EDIT_VILLAGE,
        payload: data
    }
}

export const asyncEditVillage = (id, formData, reset, setEdit) => {
    return (dispatch) => {
        axios.put(`/api/village/${id}`, formData, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(editVillage(result))
                reset()
                setEdit(false)

            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


//Delete 

export const destroyVillage = (data) => {
   return {
        type: DESTROY_VILLAGE,
        payload: data
    }
}

export const asyncDestroyVillage = (id) => {
    return (dispatch) => {
        axios.delete(`/api/village/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('name')){
                     dispatch(destroyVillage({}))
                }
                else{
                    Swal.fire('Record not Deleted')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}