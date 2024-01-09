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

const Rental = ({index,rental,content_prices,text_availability}:{index:number,rental?:TextRental,content_prices?:{title?:string,text?:string},text_availability?:string}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 pt-16 lg:pt-24 lg:m-3 bg-white overflow-y-scroll lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="order-3">
        <ImageGallery images={rental?.pictures} />
      </div>
      <div className="order-1">
        <Heading3 text={rental?.name} />
        {password && <EditRental index={+index} section={4} />}
        <Paragraph text={rental?.description} />
        <RentalSpecs rental={rental} />
      </div>
      <div className="order-5 my-3 mx-auto lg:m-0 py-4 px-8 bg-gray-50 shadow lg:w-full max-w-xl md:text-2xl lg:text-xl">
        <Heading3 text={text_availability} />
        <RentalCalendar rental={rental} />
      </div>
      <div className="order-6 p-4 lg:bg-gray-50">
        <Heading3 text={content_prices?.title} />
        <Paragraph text={content_prices?.text} />
        <RentalPrices rentalIndex={+index} />
      </div>
    </div>
  )
}

export default Rental