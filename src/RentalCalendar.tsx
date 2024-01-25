import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

//@ts-ignore
import ICAL from 'ical.js'
// no TS for ical.js

import 'moment/locale/en-gb'
import { TextRental } from './Rental'
import { apiUrl } from './constants/constants'

interface Event {
  title: string;
  start: Date;
  end: Date;
  first_day?: boolean;
  last_day?:boolean;
}

interface Events extends Array<Event> {}

const localizer = momentLocalizer(moment)

const RentalCalendar = ({rental}:{rental?:TextRental}) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchICalData = async () => {
      if (rental) { 
        const proxyUrl = apiUrl + 'get_calendar.php'

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
            const startDate = new Date(vevent.getFirstPropertyValue('dtstart').toJSDate().setHours(vevent.getFirstPropertyValue('dtstart').toJSDate().getHours() + 16))
            const endDate = new Date(vevent.getFirstPropertyValue('dtend').toJSDate().setHours(vevent.getFirstPropertyValue('dtend').toJSDate().getHours() - 14))
            
            return {
              title: summary,
              start: startDate,
              end: endDate,
            }
          })

          setEvents(parsedEvents)
        } catch (error) {
          console.error('Error fetching or parsing iCalendar data:', error)
        }
      }
    }
    
    fetchICalData() 
  }, [rental])
  
  const eventStyleGetter = (event:Event) => {
    if (event.first_day) {
      return {
        style: {
          color: 'transparent',
          background: 'linear-gradient(to bottom right, white, white 50%, darkred 50%, darkred)'
          
        },
      }
    } else {
      if (event.last_day) {
        return {
          style: {
            background: 'linear-gradient(to top left, white, white 50%, darkred 50%, darkred)',
            color: 'transparent',
          },
        }
      }
    }
    
    return {
      style: {
        backgroundColor: 'darkred',
        color: 'transparent',
      },
    }
  }


  const breakUpEvents = (events:Events) => {
    const updatedEvents:Events = []
  
    events.forEach((event) => {
      const start = moment(event.start)
      const end = moment(event.end)
  
      updatedEvents.push({
        title: 'booking filler',
        start: start.toDate(),
        end: start.endOf('day').toDate(),
        first_day: true,
      })
  
      // Add event for the days in between
      if (start.add(1, 'day').isBefore(end, 'day')) {
        updatedEvents.push({
          ...event,
          start: start.startOf('day').set({ hour: 0, minute: 1, second: 0, millisecond: 0 }).toDate(),
          end: end.startOf('day').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate(),
        })
      }
  
      updatedEvents.push({
        title: 'booking filler',
        start: end.startOf('day').toDate(),
        end: end.toDate(),
        last_day: true,
      })
    })
  
    return updatedEvents
  }
    
  const updatedEvents = breakUpEvents(events)
  
  return (
    <Calendar
      localizer={localizer}
      // events={events}
      events={updatedEvents}
      startAccessor="start"
      endAccessor="end"
      drilldownView={null}
      views={{ month: true, week: false, day: false, agenda: false, }}
      style={{ height: 600}}
      eventPropGetter={eventStyleGetter}
      showMultiDayTimes={true}
    />
  )
}

export default RentalCalendar