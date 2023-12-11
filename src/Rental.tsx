import React from "react"
import Heading3 from "./shared/Heading3"
import RentalSpec from "./RentalSpec"
import RentalImageGallery from "./RentalImageGallery"
import RentalImage from "./RentalImage";
import Paragraph from "./shared/Paragraph";
import RentalCalendar from "./RentalCalendar"
import RentalPrices from "./RentalPrices";

export interface TextRental {
  name:string;
  description:string;
  pictures: [ {original:string} ];
  specs: [ number ];
  calendar_url: string;
  videos: [ {embedUrl:string} ];
  prices: [ number ];
}

const Rental = ({index,rental,overview}:{index:number,rental:TextRental,overview:boolean}) => (
  <div className="lg:rounded lg:shadow lg:m-3 px-5 py-3 bg-white">
    <Heading3 text={rental.name} />
    <Paragraph text={rental.description} />
    {overview ?
      <RentalImage image={rental.pictures[0]} />
    :
      <RentalImageGallery images={rental.pictures} />
    }
    <div className="grid grid-cols-3">
      {rental.specs.length > 0 && rental.specs.map((spec,index)=>
        <React.Fragment key={index}>
          <RentalSpec spec={spec} index={index} />
        </React.Fragment>
      )}
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
  </div>
)

export default Rental