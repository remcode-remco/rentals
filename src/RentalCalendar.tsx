import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

//@ts-ignore
import ICAL from 'ical.js'
// no TS for ical.js

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/en-gb'
import { TextRental } from './Rental'

const localizer = momentLocalizer(moment)

const RentalCalendar = ({rental}:{rental:TextRental}) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchICalData = async () => {
      const proxyUrl = 'https://www.remcode.net/gite/get_calendar.php'

      const calendar_url = rental.calendar_url

      const formData = new FormData();
      formData.append('calendar_url', calendar_url);
      try {
        const response = await fetch(proxyUrl, {
          method: 'POST',
          body: formData,
        });
        const icalData = await response.text()

        const jcalData = ICAL.parse(icalData)
        const comp = new ICAL.Component(jcalData)
        const vevents = comp.getAllSubcomponents('vevent')
        
        const parsedEvents = vevents.map((vevent: { getFirstPropertyValue: (arg0: string) => any }) => {
          const summary = vevent.getFirstPropertyValue('summary')
          const startDate = vevent.getFirstPropertyValue('dtstart')
          const endDate = vevent.getFirstPropertyValue('dtend')

          return {
            title: summary,
            start: startDate.toJSDate(),
            end: endDate.toJSDate(),
          }
        })

        setEvents(parsedEvents)
      } catch (error) {
        console.error('Error fetching or parsing iCalendar data:', error)
      }
    }
    
    fetchICalData()
  }, [])
  
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      drilldownView={null}
      views={{ month: true, week: false, day: false, agenda: false, }}
      style={{ height: 500 }}
    />
  )
}

export default RentalCalendar