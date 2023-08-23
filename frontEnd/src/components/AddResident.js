import ResidentForm from "./ResidentForm"
import { useDispatch } from "react-redux"
import { asyncCreateResident } from "../actions/residentsActions"

const AddResident = ()=>{
    const dispatch =useDispatch()

    const formSubmission = (formData,reset)=>{
        //     formData.role = 'resident'
           dispatch(asyncCreateResident(formData,reset))
    } 
    return(
        <div>
               <ResidentForm  formSubmission={formSubmission}/>
        </div>
    )
}


export default AddResident