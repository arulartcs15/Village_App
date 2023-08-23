import { useDispatch } from "react-redux"
import { asyncCreateProduct } from "../actions/productsActions"
import ProductForm from "./ProductForm"

const AddProduct = (props)=>{
    const dispatch =useDispatch()

    const {t} = props

    const productSubmission = (formData,reset)=>{
        console.log(formData.files, "formdata")
           dispatch(asyncCreateProduct(formData,reset))
    } 
    return(
        <div>
              <ProductForm  productSubmission={productSubmission} t={t}/>
     </div>
    )
}

export default AddProduct