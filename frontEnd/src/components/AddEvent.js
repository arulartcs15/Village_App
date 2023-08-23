import { useDispatch } from "react-redux"
import { asyncCreateEvent } from "../actions/eventsActions"
import EventForm from "./EventForm"

const AddEvent = ()=>{
    const dispatch =useDispatch()

    const eventSubmission = (formData,reset)=>{
           dispatch(asyncCreateEvent(formData,reset))
    } 
    return(
        <div>
             
               <EventForm  eventSubmission={eventSubmission}/>

        </div>
    )
}

export default AddEvent