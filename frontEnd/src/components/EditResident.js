import ResidentForm from "./ResidentForm"
import { useDispatch } from "react-redux"
import { asyncEditResident,asyncSetEditResidentId } from "../actions/residentsActions"

const EditResident = ()=>{
    const dispatch =useDispatch()
    const formSubmission = (formData,reset,id)=>{
        dispatch(asyncEditResident(formData,reset,id))
        dispatch(asyncSetEditResidentId(''))
 } 
    return(
        <div>
           <ResidentForm formSubmission={formSubmission} />
             </div>
    )
}


export default EditResident