import Swal from 'sweetalert2'
import axios from '../config/axios'
export const GET_RESIDENTS = 'GET_RESIDENTS'
export const CREATE_RESIDENT = "CREATE_RESIDENT"
export const EDIT_RESIDENT = "EDIT_RESIDENT"
export const DESTROY_RESIDENT = "DESTROY_RESIDENT"
export const GET_ONE_RESIDENT = "GET_ONE_RESIDENT "
export const SET_RESIDENT_ID = "SET_RESIDENT_ID"


//Get 

export const getResidents = (data) => {
  return {
    type: GET_RESIDENTS,
    payload: data
  }
}


export const asyncGetResidents = () => {
  return (dispatch) => {
    axios.get('/api/residents', { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
        dispatch(getResidents(result))
      })
      .catch((err) => {
        alert(err.message)
      })
  }
}


//Get one Resident

export const getOneResident = (data) => {
  return {
    type: GET_ONE_RESIDENT,
    payload: data
  }
}


export const asyncGetOneResident = (id) => {
  return (dispatch) => {
    axios.get(`/api/residents/:id`, { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
        console.log(result, 'one')
        dispatch(getOneResident(result))
      })
      .catch((err) => {
        alert(err.message)
      })
  }
}
//create

export const createResident = (data) => {
  return {
    type: CREATE_RESIDENT,
    payload: data
  }
}

export const asyncCreateResident = (formData, reset) => {
  return (dispatch) => {
    axios.post('/api/residents', formData, { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
         if(result.hasOwnProperty('password')){
        dispatch(createResident(result))
        reset()
        }
        else{
          Swal.fire(result.message)
          reset()

        }
      })
      .catch((err) => {
        alert(err.message)
      })
  }
}


//update 

export const editResident = (data) => {
  return {
    type: EDIT_RESIDENT,
    payload: data
  }
}

export const asyncEditResident = (formData, reset, id) => {
  return (dispatch) => {
    axios.put(`/api/residents/${id}`, formData, { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
        dispatch(editResident(result))
        reset()
      })
      .catch((err) => {
        alert(err.message)
      })
  }
}

//GET EditId

export const setEditResidentId = (id) => {
  return {
    type: SET_RESIDENT_ID,
    payload: id
  }
}

export const asyncSetEditResidentId = (id) => {
  return (dispatch) => {
    (async () => {
      try {
        const resident = await axios.get(`/api/residents/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
        dispatch(setEditResidentId(resident.data._id))
      } catch (e) {
        console.log(e.message)
      }
    })()

  }
}









//Delete

export const destroyResident = (id) => {
  return {
    type: DESTROY_RESIDENT,
    payload: id
  }
}

export const asyncDestroyResident = (id) => {
  return (dispatch) => {
    axios.delete(`/api/residents/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
        dispatch(destroyResident(result))
      })
      .catch((err) => {
        alert(err.message)
      })
  }
}