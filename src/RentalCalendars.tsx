import React from "react"
import Calendar from "./RentalCalendar"
import { TextNavigation } from "./Navigation"
import { TextRental } from "./Rental"

//@ts-ignore
const RentalCalendars = ({text_rentals,text_navigation}:{text_rentals:any,text_navigation:TextNavigation}) => {

  return (
    <section>
      <div
        className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {text_rentals.rentals.map((rental: TextRental,index: React.Key | null | undefined)=>(
            <React.Fragment key={index}>
              <Calendar rental={rental} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RentalCalendars