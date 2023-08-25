import { useState, useEffect } from "react"
import { Row, Col, Form } from 'react-bootstrap'
import { asyncGetVillage } from "../actions/villagesActions"
import { asyncGetEvents } from "../actions/eventsActions"
import { useSelector, useDispatch } from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const EventForm = (props) => {

    const dispatch = useDispatch()

    const { eventSubmission } = props

    const accountDetails = useSelector((state) => {
        return state.users.userDetails
    })

    useEffect(() => {
        dispatch(asyncGetVillage(accountDetails._id))
        dispatch(asyncGetEvents(accountDetails._id))
    }, [accountDetails])

    const data = useSelector((state => {
        return state
    }))

    const result = data.events.data.find((ele) => {
        return ele._id === data.events.editId
    })

    const [title, setTitle] = useState(result?.title ? result.title : '')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [description, setDescription] = useState(result?.description ? result.description : '')
    const [villageId, setVillageId] = useState(result?.villageId ? result.villageId : '')
    const [adminId, setAdminId] = useState(result?.adminId ? result.adminId : '')
    const [formErrors, setformErrors] = useState({})
    const errors = {}

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleStartDatechange = (date) => {
      console.log(date,'k')
        const newDate = (`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
        setStartDate(newDate)
        console.log(newDate)
    }

    const handleEndDatechange = (date) => {
       const newDate = (`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
       setEndDate(newDate)
    }

    const handleDescriptionchange = (e) => {
        setDescription(e.target.value)
        setVillageId(data.village.data._id)
        setAdminId(accountDetails._id)
    }

    const runValidations = () => {
        if (title.length === 0) {
            errors.title = 'Event Title cannot be blank'
        }
        if (typeof(startDate) === 'object') {
            errors.startDate = 'Start Date of Event cannot be blank'
        }
        if (typeof(endDate) === 'object') {
            errors.endDate = 'End Date of Event cannot be blank'
        }
        if (description.length === 0) {
            errors.description = 'Description of Event cannot be blank'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setformErrors({})
            const formData = {
                title,
                startDate,
                endDate,
                description,
                villageId,
                adminId

            }
            const reset = () => {
                setTitle('')
                setStartDate(new Date())
                setEndDate(new Date())
                setDescription('')
                setVillageId('')
                setAdminId('')
            }
            eventSubmission(formData, reset, result?._id)
        }
        else {
            setformErrors(errors)
        }
    }

    return (
        <div className="pad1">
            {data.village.data === null ? <p style={{ color: "red" }}>Create Village Record,to access this page</p> :
                <div className="card-shadow">
                    <div className="card body">
                        <div className="register">
                    <Row className="justify-content-md-center">
                        <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>{data.events.editId ? "Edit Event" : " Add Event"}</h1> </Col></center>
                    </Row>
                    
                        <Form className="form" >
                            <Form.Group as={Row} className='mt-5'>
                                <Form.Label  column md={2}>Title</Form.Label>
                                <Col >
                                    <Form.Control type='text' value={title} placeholder="Enter Event Title" onChange={handleTitleChange} />

                                    <Form.Text className="text-muted">
                                        {formErrors.title ? <span style={{ color: "red" }}>{formErrors.title}</span> :<span  style={{ color: "green" }}> "We'll never share your Event Title with anyone else."</span>}
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className='mt-3'>
                                <Form.Label column md={2}>StartDate</Form.Label>
                                <Col >
                                    <Calendar onChange={handleStartDatechange} value={startDate} />

                                    <Form.Text className="text-muted">
                                        {formErrors.startDate ? <span style={{ color: "red" }}>{formErrors.startDate}</span> :<span  style={{ color: "green" }} > "We'll never share your Event start Date with anyone else."</span>}
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className='mt-3'>
                                <Form.Label column md={2}>EndDate</Form.Label>
                                <Col>
                                    <Calendar value={endDate} onChange={handleEndDatechange} />

                                    <Form.Text className="text-muted">
                                        {formErrors.endDate ? <span style={{ color: "red" }}>{formErrors.endDate}</span> :<span   style={{ color: "green" }} > "We'll never share your Event End Date with anyone else."</span>}
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className='mt-3'>
                                <Form.Label column md={2}>Description</Form.Label>
                                <Col >
                                    <Form.Control type='textarea' value={description} placeholder="Enter Description of Event" onChange={handleDescriptionchange} />

                                    <Form.Text className="text-muted">
                                        {formErrors.description ? <span style={{ color: "red" }}>{formErrors.description}</span> :<span   style={{ color: "green" }} > "We'll never share your Event Details with anyone else."</span>}
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            </Form>

                            <button className="registerButton" type="submit" onClick={handleSubmit}>
                                {data.events.editId ? 'Edit' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EventForm