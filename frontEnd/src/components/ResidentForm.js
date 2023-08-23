import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Button, Row, Col, Form } from 'react-bootstrap'
import { asyncGetVillage } from '../actions/villagesActions'
import { asyncGetResidents } from '../actions/residentsActions'

const ResidentForm = (props) => {
    const { formSubmission } = props

    const dispatch = useDispatch()

    const accountDetails = useSelector((state)=>{
        return state.users.userDetails
    }) 

   useEffect(() => {
        dispatch(asyncGetVillage(accountDetails._id))
        dispatch(asyncGetResidents())
    }, [accountDetails])

    const data = useSelector((state) => {
        return state
    })
 

    const result = data.residents.data.find((ele) => {
        return ele._id === data.residents.editId
    })

    const [name, setName] = useState(result?.name ? result.name : '')
    const [phoneNumber, setPhoneNumber] = useState(result?.phoneNumber ? result.phoneNumber : '')
    const [doorNo, setDoorNo] = useState(result?.doorNo ? result.doorNo : '')
    const [password, setPassword] = useState(result?.password ? result.password : '')
    const [villageId, setVillageId] = useState(result?.villageId ? result.villageId : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }
  
    const handleDoorNoChange = (e) => {
        setDoorNo(e.target.value)
        
        setVillageId(data.village.data._id)

    }

    const handlePasswordchange = (e) => {
        setPassword(e.target.value)
    }

    const runValidations = () => {
        if (name.length === 0) {
            errors.name = 'Name cannot be blank'
        }
        if (phoneNumber.length === 0) {
            errors.phoneNumber = 'phoneNumber cannot be blank'
        }
        if (doorNo.length === 0) {
            errors.doorNo = 'Door Number cannot be blank'
        }
        if (doorNo.password === 0) {
            errors.password = 'password cannot be blank'
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                name,
                phoneNumber,
                doorNo,
                password,
                villageId

            }
           
            const reset = () => {
                setName('')
                setPhoneNumber('')
                setDoorNo('')
                setPassword('')
                setVillageId('')
            }
           
              formSubmission(formData, reset, result?._id)
        }
        else {
            setFormErrors(errors)
        }
    }

    return (
        <div>
            { data.village.data === null ?  <p style={{color:"red"}}>Create Village Record,to access this page</p> :
         <center>
             
              <Row className="justify-content-md-center">
                <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>{data.residents.editId ? "Edit Resident" : " Add Resident"}</h1> </Col></center>
            </Row>

                <Form  >
                    <Form.Group as={Row} className='mt-5'>
                        <Form.Label className="mx-5" column md={2}>Resident Name</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={name} placeholder="Enter your Resident name" onChange={handleNameChange} />

                            <Form.Text className="text-muted">
                                {formErrors.name ? <span style={{ color: "red" }}>{formErrors.name}</span> : "We'll never share your Resident Name with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>PhoneNumber</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={phoneNumber} placeholder="Enter your  phoneNumber" onChange={handleNumberChange} />

                            <Form.Text className="text-muted">
                                {formErrors.phoneNumber ? <span style={{ color: "red" }}>{formErrors.phoneNumber}</span> : "We'll never share your Phone Number with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>DoorNo</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={doorNo} placeholder="Enter your DoorNo" onChange={handleDoorNoChange} />

                            <Form.Text className="text-muted">
                                {formErrors.doorNo ? <span style={{ color: "red" }}>{formErrors.doorNo}</span> : "We'll never share your Resident details with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                            <Form.Label className="mx-5" column md={2}>Password</Form.Label>
                            <Col md={5}>
                                <Form.Control type='password' value={password} placeholder={"Enter your password"} onChange={handlePasswordchange} />

                                <Form.Text className="text-muted">
                                    {formErrors.password ? <span style={{ color: "red" }}>{formErrors.password}</span> : "We'll never share your password with anyone else."}
                                </Form.Text>
                            </Col>
                        </Form.Group>


                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        {data.residents.editId ? 'Edit' : 'create'}
                    </Button>

                </Form>
                
                </center>
                    }

      
        </div>
    )

}


export default ResidentForm