import React, { useState, useEffect,useRef }from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Calendar=(props)=>{
    const {data}=props
    console.log(data,'child')
      const [events,setEvents]=useState([])

      useEffect(()=>{
        const dataEvents=data.map((ele)=>({
            title:ele.title,
            start:ele.startDate,
            end:ele.endDate
              
        }))
        setEvents(dataEvents)
        console.log(dataEvents,'data')
      },[data])

      const showPopup=useRef(null)

console.log(events,'state')
      const handleShow=(events)=>{
        console.log('fi')
        showPopup.current=new bootstrap.Popover(events.el,{
            title:`Event Title : ${events.event.title}`,
            placement:'auto',
            trigger:'manual',
            customClass:'popoverStyle',
            content:`<p>  <strong > Start Date : </strong> ${events.event.start} </p><br/> 
            <p> <strong> End Date : </strong> ${events.event.end} </p>`,
            html:true
        })

      showPopup.current.show()

      }

    return(<div>
   <FullCalendar 
   plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
   initialView='dayGridMonth'
   dayMaxEvents={true}
   headerToolbar={{
    left:'prev,next today',
    center:'title',
    right:'dayGridMonth,timeGridMonth,timeGridDay'
   }}
   height={'90vh'}
   events={events}
   eventClick={handleShow}

   />
    </div>)
}

export default Calendar

