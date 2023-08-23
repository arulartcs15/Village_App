import axios from '../config/axios'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
export const CREATE_USER = "CREATE_USER"
export const GET_USER = "GET_USER"
export const ACCOUNT_DETAILS = "ACCOUNT_DETAILS"
export const GET_ADMIN = "GET_ADMIN"
export const EDIT_ADMIN = "EDIT_ADMIN"
export const DELETE_ADMIN = "DELETE_ADMIN"
export const PERMANENT_DELETE_ADMIN = "PERMANENT_DELETE_ADMIN"


//Register

export const createUser = (data) => {
    return {
        type: CREATE_USER,
        payload: data
    }
}



export const asynctUserRegister = (formData, props, reset) => {
    return (dispatch) => {
        axios.post('/api/register', formData)
            .then((result) => {
                if (result.data.hasOwnProperty('password')) {
                    dispatch(createUser(result.data))
                    reset()
                    props.history.push('/')
                }
                else {
                    Swal.fire(result.data)
                }

            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

//Account Details
export const accountDetails = (data) => {
    return {
        type: ACCOUNT_DETAILS,
        payload: data
    }
}



export const asyncAccountDetails = (token, props, setIsLogged) => {

    return (dispatch) => {
        axios.get('/api/account', {
            headers: {
                'authorization': token
            }
        })
            .then((result) => {
                if (result.data.role == 'superAdmin') {
                    props.history.push('/admin')

                }
                 else{
                     props.history.push('/home')
                    } 
                dispatch(accountDetails(result.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


//Login



export const asyncUserLogin = (formdata, props, setIsLogged) => {
    return (dispatch) => {
        axios.post('/api/login', formdata)
            .then((result) => {
                localStorage.setItem('token', result.data.token)
                if (localStorage.getItem('token') != 'undefined') {
                    Swal.fire('successfully logged in')
                   dispatch(asyncAccountDetails(result.data.token, props, setIsLogged))

                }
                else {
                    props.history.push('/login')
                    Swal.fire('Invalid Email or password')
                }
            })
            .catch((err) => {
                Swal.fire({
                    errors: "Invaild Email and Password"
                })
            })
    }
}

//delete 

export const deleteAdmin = (data) => {
    return {
        type: PERMANENT_DELETE_ADMIN,
        payload: data
    }
}



export const asyncAccountDelete = (props, id, setIsLogged) => {
  
    return (dispatch) => {
        axios.delete(`/api/delete/${id}`, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
               
                const token = localStorage.getItem('token')
                const decoded = jwt_decode(token)
                if (decoded.role !== 'superAdmin') {
                    setIsLogged(false)
                    localStorage.removeItem('token')
                    props.history.push('/')
                }
                else {
                    dispatch(deleteAdmin(result.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


//getting data based on role "admin"

export const getAdmin = (data) => {
    return {
        type: GET_ADMIN,
        payload: data
    }
}



export const asyncGetAdmin = (token) => {
    return (dispatch) => {
        axios.get('/api/users', {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
                dispatch(getAdmin(result.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


//Edit Admin

export const editAdmin = (data) => {
    return {
        type: EDIT_ADMIN,
        payload: data
    }
}

export const asyncEditAdmin = (formData, id) => {
    return (dispatch) => {
        axios.put(`/api/user/${id}`, formData, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(editAdmin(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


//Delete Admin

export const destroyAdmin = (data) => {
    return {
        type: DELETE_ADMIN,
        payload: data
    }
}

export const asyncDestroyAdmin = (id, type) => {

    return (dispatch) => {
        axios.delete(`/api/admindelete/${id}?type=${type.type}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
               
                dispatch(destroyAdmin(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


