import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Calender = (props) => {
  const [events, setEvents] = useState([])


  useEffect(() => {
    console.log(props.data.endDate);
    if (Array.isArray(props.data)) {
      const formattedEvents = props.data.map((ele) => ({
        title: ele.title,
        start: ele.startDate,
        end: ele.endDate,
      }));
      setEvents(formattedEvents)
    }
  }, [props.data])

  useEffect(() => {
   
    return () => {
      disposePopover();
    };
  }, [])

 
  const activePopoverRef = useRef(null)


  const disposePopover = () => {
    if (activePopoverRef.current) {
      activePopoverRef.current.dispose()
      activePopoverRef.current = null
    }
  }


  const handleEventClick = (info) => {
    console.log(info);
    disposePopover()

    activePopoverRef.current = new bootstrap.Popover(info.el, {
      title: `Event Title: ${info.event.title}`,
      placement: 'auto',
      trigger: 'manual',
      customClass: 'popoverStyle',
      content: `<p>
      <strong>StartDate:</strong>${info.event.start} <br/>
       <strong>EndDate:</strong>${info.event.end} <br/>
       </p>`,
      html: true,
    })
    activePopoverRef.current.show()
  }


  const handleCalendarClick = () => {
    
    disposePopover()
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        themeSystem="bootstrap5"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height={'90vh'}
        events={events}
        eventClick={handleEventClick} 
        dateClick={handleCalendarClick} 
      />

    </div>
  )
}

export default Calender

