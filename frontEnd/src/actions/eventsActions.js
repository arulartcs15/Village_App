import axios from '../config/axios'
export const GET_EVENTS = 'GET_EVENTS'
export const CREATE_EVENT = 'CREATE_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const SET_EVENT_ID ="SET_EVENT_ID"
export const DESTROY_EVENT = "DESTROY_EVENT"

export const getEvents = (data) => {
    return {
        type: GET_EVENTS,
        payload: data
    }
}


export const asyncGetEvents = (id) => {

    return (dispatch) => {
        axios.get(`api/allevents/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(getEvents(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

//create


export const createEvent = (data) => {
    return {
        type:CREATE_EVENT,
        payload: data
    }
  }
  
  export const asyncCreateEvent = (formData, reset) => {
   return (dispatch) => {
        axios.post('/api/events', formData, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(createEvent(result))
                reset()
            })
            .catch((err) => {
                alert(err.message)
            })
    }
  }
  

  //Edit
  export const editEvent = (data) => {
    return {
        type:EDIT_EVENT,
        payload: data
    }
  }
  
  export const asyncEditEvent = (formData, reset,id) => {
   return (dispatch) => {
        axios.put(`/api/events/${id}`, formData, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                console.log(result,'edit')
                dispatch(editEvent(result))
                reset()
               })
            .catch((err) => {
                alert(err.message)
            })
    }
  }

//set event id

export const setEditEventId=(id)=>{
    return{
      type:SET_EVENT_ID,
      payload:id
    }
  }
  
  export const asyncSetEditEventId=(id)=>{
    return(dispatch)=>{
      ( async()=>{ 
    
      try{
        if(id){
       const event =await axios.get(`/api/events/${id}`,{headers: { 'authorization': localStorage.getItem('token') } })
       dispatch(setEditEventId(event.data._id))
      }
      else{
        dispatch(setEditEventId(''))
      }
      }catch(e){
        console.log(e.message)
      }
      })()
     
    }
  }


  //Delete

  export const destroyEvent = (data) => {
    return {
        type: DESTROY_EVENT,
        payload: data
    }
  }
  
  export const asyncDestroyEvent = (id) => {
    return (dispatch) => {
        axios.delete(`/api/events/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(destroyEvent(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
  }
