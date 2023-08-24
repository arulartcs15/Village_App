import { Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncUserLogin } from '../actions/usersActions'

const Login = (props) => {
    const dispatch = useDispatch()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setpassword] = useState('')
    const [formErrors, setformErrors] = useState({})
    const errors = {}
    const { setIsLogged } = props
    const { t } = props

    const handleNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }
    const handlePasswordchange = (e) => {
        setpassword(e.target.value)
    }
    const runValidations = () => {
        if (phoneNumber.length === 0) {
            errors.phoneNumber = 'phoneNumber cannot be blank'
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
            const formData = {
                phoneNumber,
                password
            }
            dispatch(asyncUserLogin(formData, props, setIsLogged))
        }
        else {
            setformErrors(errors)
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'>

                    </div>
                    <div className='pad col-md-6'>
                        <div className='card-shadow'>
                        <div className='card body'>
                            <div className='register'>
                        <Row className="justify-content-md-center">
                            <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>{t("Login")} </h1> </Col></center>
                        </Row>


                        <Form  className='form' >
                            <Form.Group as={Row} className='mt-5'>
                                <Form.Label  column md={2}>{t("PhoneNumber")}</Form.Label>
                                <Col >
                                    <Form.Control type='text' value={phoneNumber} placeholder={t("phonenumber")} onChange={handleNumberChange} />

                                    <Form.Text className="text-muted">
                                        {formErrors.phoneNumber ? <span style={{ color: "red" }}>{t("blankPhoneNumber")}</span> : <span style={{color:'green'}}>{t("sharePhoneNumber")}</span>}
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className='mt-3'>
                                <Form.Label  column md={2}>{t("Password")}</Form.Label>
                                <Col>
                                    <Form.Control type='password' value={password} placeholder={t("password")} onChange={handlePasswordchange} />

                                    <Form.Text className="text-muted">
                                        {formErrors.password ? <span style={{ color: "red" }}>{t("blankPassword")}</span> : <span style={{color:'green'}}>{t("sharePassword")}</span>}
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </Form>
                        <button  className='registerButton' type="submit" onClick={handleSubmit}>
                                {t("Login")}
                            </button>
                        </div>
                        </div>
                        </div>
                    </div>
                    <div className='col-md-3'>

                    </div>

                </div>
            </div>

        </div>
    )


}

export default Login