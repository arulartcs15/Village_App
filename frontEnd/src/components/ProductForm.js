import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Row, Col, Form } from 'react-bootstrap'
import { asyncGetVillage } from "../actions/villagesActions"


const ProductForm = (props) => {

    const dispatch = useDispatch()

    const { productSubmission ,t  } = props

    const image = useRef(null)

    const accountDetails = useSelector((state) => {
        return state.users.userDetails
    })

    useEffect(() => {
        dispatch(asyncGetVillage(accountDetails.adminId))
    }, [])

    const data = useSelector((state => {
        return state
    }))



    const result = data.products.data.find((ele) => {
        return ele._id === data.products.editId
    })

    const [name, setName] = useState(result?.name ? result.name : '')
    const [price, setPrice] = useState(result?.price ? result.price : '')
    const [phoneNumber, setPhoneNumber] = useState(result?.phoneNumber ? result.phoneNumber : '')
    const [quantity, setQuantity] = useState(result?.quantity ? result.quantity : '')
    const [description, setDescription] = useState(result?.description ? result.description : '')
    const [residentId, setResidentId] = useState(result?.residentId ? result.residentId : '')
    const [villageId, setVillageId] = useState(result?.villageId ? result.villageId : '')
    const [adminId, setAdminId] = useState(result?.adminId ? result.adminId : '')
    const [productImage, setProductImage] = useState(result?.image ? result.image : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}


    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handlePricechange = (e) => {
        setPrice(e.target.value)
    }

    const handlephoneNumberchange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleQuantitychange = (e) => {
        setQuantity(e.target.value)
    }

    const handleDescriptionchange = (e) => {
        setDescription(e.target.value)
        setVillageId(data.village.data._id)
        setResidentId(accountDetails._id)
        setAdminId(accountDetails.adminId)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProductImage(file)
        }
    }

    const runValidations = () => {
        if (name.length === 0) {
            errors.name = 'Name of product cannot be blank'
        }
        if (price.length === 0) {
            errors.price = 'price of product cannot be blank'
        }
        if (phoneNumber.length === 0) {
            errors.phoneNumber = 'phoneNumber cannot be blank'
        }
        if (quantity.length === 0) {
            errors.quantity = 'product quantity cannot be blank'
        }
        if (description.length === 0) {
            errors.description = 'Description cannot be blank'
        }
     }
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            let formData1 = new FormData()
             if (!result) {
                formData1.append('name', name)
                formData1.append('price', price)
                formData1.append('phoneNumber', phoneNumber)
                formData1.append('quantity', quantity)
                formData1.append('description', description)
                formData1.append('residentId', residentId)
                formData1.append('villageId', villageId)
                formData1.append('adminId', adminId)
                formData1.append('productImage', productImage)
            }
            else {
                formData1 = {
                    name,
                    price,
                    phoneNumber,
                    quantity,
                    description,
                    residentId,
                    villageId,
                    adminId
                }
            }

            const reset = () => {
                setName('')
                setPrice('')
                setPhoneNumber('')
                setQuantity('')
                setDescription('')
                setResidentId('')
                setVillageId('')
                setAdminId('')
                if (image.current) {
                    image.current.form.reset()
                }
            }
            productSubmission(formData1, reset, result?._id)
        }
        else {
            setFormErrors(errors)
        }
    }

    return (
        <div>
            <Row className="justify-content-md-center">
                <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>{data.products.editId ? <span>{t("EditProduct")} </span>:<span>{t("AddProduct")}</span> }</h1> </Col></center>
            </Row>

            <center>
                <Form  >
                    <Form.Group as={Row} className='mt-5'>
                        <Form.Label className="mx-5" column md={2}>{t("ProductName")}</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={name} placeholder={t("productname")} onChange={handleNameChange} />

                            <Form.Text className="text-muted">
                                {formErrors.name ? <span style={{ color: "red" }}>{t("blankProduct")}</span> : <span>{t("shareProductname")}</span>}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>{t("Price")}</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={price} placeholder={t("Enterprice")} onChange={handlePricechange} />

                            <Form.Text className="text-muted">
                                {formErrors.price ? <span style={{ color: "red" }}>{t("blankprice")}</span> : <span>{t("shareProductprice")}</span>}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>{t("PhoneNumber")}</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={phoneNumber} placeholder={t("phonenumber")} onChange={handlephoneNumberchange} />

                            <Form.Text className="text-muted">
                                {formErrors.phoneNumber ? <span style={{ color: "red" }}>{t("blankPhoneNumber")}</span> :<span>{t("sharePhoneNumber")}</span>}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>{t("Quantity")}</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={quantity} placeholder={t("Enterquantity")} onChange={handleQuantitychange} />

                            <Form.Text className="text-muted">
                                {formErrors.quantity ? <span style={{ color: "red" }}>{t("blankquantity")}</span> : <span>{t("shareProductdetails")}</span>}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>{t("Description")}</Form.Label>
                        <Col md={5}>
                            <Form.Control value={description} placeholder= {t("Enterdescription")} onChange={handleDescriptionchange} />

                            <Form.Text className="text-muted">
                                {formErrors.description ? <span style={{ color: "red" }}>{t("blankdescription")}</span> :<span>{t("shareProductdetails")}</span>}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>{t("Uploadimage")}</Form.Label>
                        <Col md={5}>
                            <Form.Control type="file" ref={image} placeholder="Upload Image" onChange={handleImageChange} />

                            <Form.Text className="text-muted">
                                {formErrors.productImage ? <span style={{ color: "red" }}>{formErrors.productImage}</span> :<span>{t("shareProductdetails")}</span>}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        {data.products.editId ?  <span>{t("Edit")}</span>: <span>{t("Create")}</span>}
                    </Button>

                </Form>
            </center>
        </div>
    )
}

export default ProductForm