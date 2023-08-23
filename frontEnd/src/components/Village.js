import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Row, Col, Form } from 'react-bootstrap'
import { asyncGetVillage, asyncCreateVillage, asyncEditVillage, asyncDestroyVillage } from "../actions/villagesActions"
import { asyncAccountDetails } from "../actions/usersActions"
import Swal from 'sweetalert2'
const Village = () => {
    const [name, setName] = useState('')
    const [stateName, setStateName] = useState('')
    const [districtName, setDistrictName] = useState('')
    const [edit, setEdit] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}
    const dispatch = useDispatch()

    const accountDetails = useSelector((state => {
        return state.users.userDetails
    }))

    useEffect(() => {
        dispatch(asyncGetVillage(accountDetails._id))

    }, [name, accountDetails])

    const village = useSelector((state => {
        return state.village.data
    }))

    const handleNameChange = (e) => {
        setName(e.target.value)
    }


    const handleDistrictNameChange = (e) => {
        setDistrictName(e.target.value)
    }


    const handleStateNameChange = (e) => {
        setStateName(e.target.value)
    }


    const handleEdit = (ele) => {
        setEdit(!edit)
        setName(ele.name)
        setDistrictName(ele.districtName)
        setStateName(ele.state)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                dispatch(asyncDestroyVillage(id))
            }
        })

    }

    const runValidations = () => {
        if (name.length === 0) {
            errors.name = 'Name of village cannot be blank'
        }
        if (districtName.length === 0) {
            errors.districtName = 'Name of district cannot be blank'
        }
        if (stateName.length === 0) {
            errors.stateName = 'state name  cannot be blank'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                name,
                districtName,
                state: stateName

            }
            const reset = () => {
                setName('')
                setDistrictName('')
                setStateName('')
            }
            {
                edit ? dispatch(asyncEditVillage(village._id, formData, reset, setEdit)) :
                    dispatch(asyncCreateVillage(formData, reset))
            }

        }
        else {
            setFormErrors(errors)
        }
    }


    return (
        <div>
            {
                (village?.hasOwnProperty('name')) && edit === false ? <ul> 
                    <li style={{color:"blue"}}>VillageName -{village.name} </li>
                    <li style={{color:"blue"}}>DistrictName-{village.districtName}</li>
                    <li style={{color:"blue"}}>StateName-{village.state}</li>
                    <button className="btn btn-info" onClick={() => { handleEdit(village) }}>Edit</button>
                    <button className="btn btn-danger"  onClick={() => { handleDelete(village._id) }}>Delete</button>
                </ul>

                    :

                    <div>
                        <Row className="justify-content-md-center">
                            <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>Village Register</h1> </Col></center>
                        </Row>

                        <center>
                            <Form  >
                                <Form.Group as={Row} className='mt-5'>
                                    <Form.Label className="mx-5" column md={2}>Village Name</Form.Label>
                                    <Col md={5}>
                                        <Form.Control type='text' value={name} placeholder="Enter your village name" onChange={handleNameChange} />

                                        <Form.Text className="text-muted">
                                            {formErrors.name ? <span style={{ color: "red" }}>{formErrors.name}</span> : "We'll never share your VillageName with anyone else."}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className='mt-3'>
                                    <Form.Label className="mx-5" column md={2}>District Name</Form.Label>
                                    <Col md={5}>
                                        <Form.Control type='text' value={districtName} placeholder="Enter your District name" onChange={handleDistrictNameChange} />

                                        <Form.Text className="text-muted">
                                            {formErrors.districtName ? <span style={{ color: "red" }}>{formErrors.districtName}</span> : "We'll never share your DistrictName with anyone else."}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className='mt-3'>
                                    <Form.Label className="mx-5" column md={2}>State Name</Form.Label>
                                    <Col md={5}>
                                        <Form.Control type='text' value={stateName} placeholder="Enter your state name" onChange={handleStateNameChange} />

                                        <Form.Text className="text-muted">
                                            {formErrors.stateName ? <span style={{ color: "red" }}>{formErrors.stateName}</span> : "We'll never share your StateName with anyone else."}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    create
                                </Button>
                            </Form>
                        </center>
                    </div>
            }


        </div>

    )
}
export default Village