import React, { useContext } from "react"
import Heading3 from "./shared/Heading3"
import RentalSpec from "./RentalSpec"
import ImageGallery from "./ImageGallery"
import Image from "./Image"
import Paragraph from "./shared/Paragraph"
import RentalCalendar from "./RentalCalendar"
import RentalPrices from "./RentalPrices"
import { RentalsContext, AppContext } from "./App"
import EditRental from "./shared/EditRental"

export interface TextRental {
  name:string;
  description:string;
  pictures: [ {original:string} ];
  people:string;
  bed:string;
  bath:string;
  calendar_url: string;
  videos: [ {embedUrl:string} ];
  prices: [ number ];
}

const Rental = ({index,rental,overview}:{index:number,rental:TextRental,overview:boolean}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  
  return (
    <div className="relative lg:rounded lg:shadow lg:m-3 px-5 py-3 bg-white">
      <Heading3 text={rental.name} />
      <Paragraph text={rental.description} />
      {overview ?
        <Image image={rental.pictures[0]} />
      :
        <ImageGallery images={rental.pictures} />
      }
      <div className="grid grid-cols-3">
        <RentalSpec spec={rental.people} specNo={1} />
        <RentalSpec spec={rental.bed} specNo={2} />
        <RentalSpec spec={rental.bath} specNo={3} />
      </div>
      {!overview &&
        <>
          <div>
            <Heading3 text="Beschikbaarheid" />
            <RentalCalendar rental={rental} />
          </div>
          <div>
            <Heading3 text="Prijzen" />
            <RentalPrices rentalIndex={index} />
          </div>
        </>
      }
      {password && <EditRental index={index} section={4} />}
    </div>
  )
}

export default Rental