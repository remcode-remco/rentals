import { useContext } from "react"
import Heading3 from "./shared/Heading3"
import ImageGallery from "./ImageGallery"
import Paragraph from "./shared/Paragraph"
import RentalCalendar from "./RentalCalendar"
import RentalPrices from "./RentalPrices"
import { RentalsContext, AppContext } from "./Home"
import EditRental from "./shared/EditRental"
import RentalSpecs from "./RentalSpecs"

export interface TextRental {
  name:string;
  description:string;
  pictures: {original:string}[];
  people:string;
  beds:string;
  baths:string;
  calendar_url: string;
  videos: {embedUrl:string}[];
  prices: number[];
}

const Rental = ({index,rental,text_prices,text_availability}:{index:number,rental?:TextRental,text_prices?:string,text_availability?:string}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 lg:m-3 py-3 bg-white overflow-y-scroll">
      <ImageGallery images={rental?.pictures} />
      <Heading3 text={rental?.name} />
      {password && <EditRental index={+index} section={4} />}
      <Paragraph text={rental?.description} />
      <RentalSpecs rental={rental} />
      <div className="py-4 px-8 bg-gray-50 shadow">
        <Heading3 text={text_availability} />
        <RentalCalendar rental={rental} />
      </div>
      <div className="mx-4 p-4">
        <Heading3 text={text_prices} />
        <RentalPrices rentalIndex={+index} />
      </div>
    </div>
  )
}

export default Rental