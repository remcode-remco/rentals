import { useContext, useEffect } from "react"
import Heading3 from "./shared/Heading3"
// import ImageGallery from "./ImageGallery"
import Paragraph from "./shared/Paragraph"
import RentalCalendar from "./RentalCalendar"
import RentalPrices from "./RentalPrices"
import { RentalsContext, AppContext } from "./Home"
import EditRental from "./shared/EditRental"
import RentalSpecs from "./RentalSpecs"
import Image from "./Image"
import ImageGallery from "./ImageGallery"

export interface TextRental {
  name:string;
  description:string;
  pictures: {src:string}[];
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

  useEffect(() => {
    const textDiv = document.getElementById('textDiv')
    const imageDiv = document.getElementById('imageDiv')

    if (textDiv && imageDiv) {
      textDiv.classList.add('opacity-100', 'transition-opacity')
      imageDiv.classList.add('opacity-100', 'transition-opacity')
    }
  }, [])

  if (rental) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 pt-0 lg:pt-0 bg-white overflow-y-scroll">
        <div className="lg:grid lg:grid-cols-2 lg:gap-5"> 
          <div id="imageDiv" className="lg:order-2 flex justify-center w-full h-full min-h-[50vh] max-h-[80vh] duration-500 ease-in opacity-0">
            <Image images={rental.pictures} rental_overview={false} />
          </div>
          <div id="textDiv" className={`lg:pt-24 lg:pl-10 lg:order-1 delay-300 duration-500 ease-in opacity-0`}>
            <Heading3 text={rental.name} />
            {/* {password && <EditRental index={+index} section={4} />} */}
            <Paragraph text={rental.description} />
            <RentalSpecs rental={rental} />
          </div>
          <div className="lg:w-full xl:max-w-[1600px] xl:mx-auto lg:order-3 lg:col-span-2 md:mx-2">
            <ImageGallery photos={rental.pictures} targetRowHeight={300} />
          </div>
          <div className="bg-gray-50 lg:p-5 lg:order-4 lg:w-full lg:col-span-2 lg:flex lg:justify-center">
            <div className="lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:pb-10">
              <div className="my-3 mx-auto lg:max-w-[700px] lg:ml-5 lg:mr-2 lg:my-0 py-4 px-8 md:text-2xl lg:text-xl">
                <Heading3 text={text_availability} />
                <div className="max-w-lg mx-auto md:p-5 md:rounded-xl md:shadow-lg lg:shadow-none">
                  <RentalCalendar rental={rental} />
                </div>
              </div>
              <div className="lg:p-4 lg:max-w-[700px] bg-white lg:rounded-xl lg:shadow-lg lg:mr-5 lg:ml-2 mb-10 lg:mb-0 w-full h-full">
                <Heading3 text={content_prices?.title} />
                <Paragraph text={content_prices?.text} />
                <RentalPrices rentalIndex={+index} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Rental