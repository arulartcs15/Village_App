import { useDispatch } from "react-redux"
import ProductForm from "./ProductForm"
import { asyncEditProduct,asyncSetEditProductId } from "../actions/productsActions"

const EditProduct = (props)=>{
    const dispatch =useDispatch()
    const {t} = props
    const productSubmission = (formData,reset,id)=>{
        dispatch(asyncEditProduct(formData,reset,id))
         dispatch(asyncSetEditProductId(''))
 } 
    return(
        <div>
             <ProductForm productSubmission={productSubmission} t={t} />
       </div>
    )
}


export default EditProduct