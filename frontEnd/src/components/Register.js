import { useState, Suspense } from "react"
import { useDispatch } from 'react-redux'
import { asynctUserRegister } from "../actions/usersActions"
import { Button, Row, Col, Form } from 'react-bootstrap'
import i18n from 'i18next'


const Register = (props) => {
    const [name, setName] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [password, setpassword] = useState('')
    const [formErrors, setformErrors] = useState({})
    const errors = {}
    const dispatch = useDispatch()
    const { t} = props
  

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleNumberChange = (e) => {
        setphoneNumber(e.target.value)
    }
    const handlePasswordchange = (e) => {
        setpassword(e.target.value)
    }
    const runValidations = () => {
        if (name.length === 0) {
            errors.name = 'Name cannot be blank'
                }
        if (phoneNumber.length === 0) {
            errors.phoneNumber = 'PhoneNumber cannot be blank'
        }
        if (password.length === 0) {
            errors.password = 'Password cannot be blank'
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setformErrors({})
            let formData = {
                name,
                phoneNumber,
                password
            }
            const reset = () => {
                setName('')
                setphoneNumber('')
                setpassword('')
            }
            if (localStorage.getItem('token')) {
                formData.role = 'admin'
                dispatch(asynctUserRegister(formData, props, reset))
            }
            else {
                dispatch(asynctUserRegister(formData, props, reset))
            }
        }
        else {
            setformErrors(errors)
        }
    }



    return (
        <Suspense fallback="Loading..." >
            <div>
                <Row className="justify-content-md-center">
                    <center> <Col md="auto" >{(localStorage.getItem('token')) ? <h1 style={{ color: "DarkBlue" }}>{t("admin")}</h1> : <h1 style={{ color: "DarkBlue" }}><b>{t("Register")}</b></h1>}</Col></center>
                </Row>

                <center>
                    <Form  >
                        <Form.Group as={Row} className='mt-5'>
                            <Form.Label className="mx-5" column md={2}>{t("Name")}</Form.Label>
                            <Col md={5}>
                                <Form.Control type='text' value={name} placeholder={t("name")} onChange={handleNameChange} />

                                <Form.Text className="text-muted">
                                    {formErrors.name ? <span style={{ color: "red" }}>{t("blankName")}</span> : <span>{t("shareName")}</span>}
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mt-3'>
                            <Form.Label className="mx-5" column md={2}>{t("PhoneNumber")}</Form.Label>
                            <Col md={5}>
                                <Form.Control ttype='text' value={phoneNumber} placeholder={t("phonenumber")} onChange={handleNumberChange} />

                                <Form.Text className="text-muted">
                                    {formErrors.phoneNumber ? <span style={{ color: "red" }}>{t("blankPhoneNumber")}</span> : <span>{t("sharePhoneNumber")}</span>}
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mt-3'>
                            <Form.Label className="mx-5" column md={2}>{t("Password")}</Form.Label>
                            <Col md={5}>
                                <Form.Control type='password' value={password} placeholder={t("password")} onChange={handlePasswordchange} />

                                <Form.Text className="text-muted">
                                    {formErrors.password ? <span style={{ color: "red" }}>{t("blankPassword")}</span> : <span>{t("sharePassword")}</span>}
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                           {(localStorage.getItem('token' ) )? <span>{t("Create")}</span> : <span>{t("Register")}</span> } 
                        </Button>

                    </Form>

             

                </center>
            </div>
        </Suspense>
       
    )
}
export default Register