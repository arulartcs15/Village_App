import { useState } from "react"
import { useDispatch } from 'react-redux'
import { asynctUserRegister } from "../actions/usersActions"
import { Row,Col, Form } from 'react-bootstrap'


const Register = (props) => {
    const [name, setName] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [password, setpassword] = useState('')
    const [formErrors, setformErrors] = useState({})
    const errors = {}
    const dispatch = useDispatch()
    const { t } = props


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

        <div>

        {
           (!(localStorage.getItem('token'))) ?

           <div className="container">
           <div className="row">
               <div className="col-md-3">
               </div>
               <div className="pad col-md-6">

                   <div className="card-shadow">

                       <div className="card body">

                           <div className="register">
                               <h1 >{(localStorage.getItem('token')) ? <span className="heading" style={{ color: "DarkBlue" }}>{t("admin")}</span> : <span  style={{ color: "DarkBlue" }}><b className='heading'>{t("Register")}</b></span>}</h1>
                               <Form className="form" >
                                   <Form.Group as={Row} className='mt-5'>
                                       <Form.Label  column md={2}>{t("Name")}</Form.Label>
                                       <Col >
                                           <Form.Control type='text' value={name} placeholder={t("name")} onChange={handleNameChange} />

                                           <Form.Text className="text-muted">
                                               {formErrors.name ? <span style={{ color: "red" }}>{t("blankName")}</span> : <span style={{ color: 'green' }}>{t("shareName")}</span>}
                                           </Form.Text>
                                       </Col>
                                   </Form.Group>

                                   <Form.Group as={Row} className='mt-3'>
                                       <Form.Label  column md={2}>{t("PhoneNumber")}</Form.Label>
                                       <Col>
                                           <Form.Control type='text' value={phoneNumber} placeholder={t("phonenumber")} onChange={handleNumberChange} />

                                           <Form.Text className="text-muted">
                                               {formErrors.phoneNumber ? <span style={{ color: "red" }}>{t("blankPhoneNumber")}</span> : <span style={{ color: 'green' }}>{t("sharePhoneNumber")}</span>}
                                           </Form.Text>
                                       </Col>
                                   </Form.Group>

                                   <Form.Group as={Row} className='mt-3'>
                                       <Form.Label  column md={2}>{t("Password")}</Form.Label>
                                       <Col >
                                           <Form.Control type='password' value={password} placeholder={t("password")} onChange={handlePasswordchange} />

                                           <Form.Text className="text-muted">
                                               {formErrors.password ? <span style={{ color: "red" }}>{t("blankPassword")}</span> : <span style={{ color: 'green' }}>{t("sharePassword")}</span>}
                                           </Form.Text>
                                       </Col>
                                   </Form.Group>
                                   </Form>

                                   <button className="registerButton" type="submit" onClick={handleSubmit}>
                                       {(localStorage.getItem('token')) ? <span>{t("Create")}</span> : <span>{t("Register")}</span>}
                                   </button>
                            
                           </div>
                       </div>
                   </div>
               </div>
               <div className="col-md-3">
               </div>
           </div>
       </div>

           :
           <div className="pad1">

           <div className="card-shadow">

               <div className="card body">

                   <div className="register">
                       <h1 >{(localStorage.getItem('token')) ? <span className="heading" style={{ color: "DarkBlue" }}>{t("admin")}</span> : <span  style={{ color: "DarkBlue" }}><b className='heading'>{t("Register")}</b></span>}</h1>
                       <Form className="form" >
                           <Form.Group as={Row} className='mt-5'>
                               <Form.Label  column md={2}>{t("Name")}</Form.Label>
                               <Col >
                                   <Form.Control type='text' value={name} placeholder={t("name")} onChange={handleNameChange} />

                                   <Form.Text className="text-muted">
                                       {formErrors.name ? <span style={{ color: "red" }}>{t("blankName")}</span> : <span style={{ color: 'green' }}>{t("shareName")}</span>}
                                   </Form.Text>
                               </Col>
                           </Form.Group>

                           <Form.Group as={Row} className='mt-3'>
                               <Form.Label  column md={2}>{t("PhoneNumber")}</Form.Label>
                               <Col>
                                   <Form.Control ttype='text' value={phoneNumber} placeholder={t("phonenumber")} onChange={handleNumberChange} />

                                   <Form.Text className="text-muted">
                                       {formErrors.phoneNumber ? <span style={{ color: "red" }}>{t("blankPhoneNumber")}</span> : <span style={{ color: 'green' }}>{t("sharePhoneNumber")}</span>}
                                   </Form.Text>
                               </Col>
                           </Form.Group>

                           <Form.Group as={Row} className='mt-3'>
                               <Form.Label  column md={2}>{t("Password")}</Form.Label>
                               <Col >
                                   <Form.Control type='password' value={password} placeholder={t("password")} onChange={handlePasswordchange} />

                                   <Form.Text className="text-muted">
                                       {formErrors.password ? <span style={{ color: "red" }}>{t("blankPassword")}</span> : <span style={{ color: 'green' }}>{t("sharePassword")}</span>}
                                   </Form.Text>
                               </Col>
                           </Form.Group>
                           </Form>

                           <button className="registerButton" type="submit" onClick={handleSubmit}>
                               {(localStorage.getItem('token')) ? <span>{t("Create")}</span> : <span>{t("Register")}</span>}
                           </button>
                    
                   </div>
               </div>
           </div>
       </div>

        }
        
        </div>
    )
}
export default Register