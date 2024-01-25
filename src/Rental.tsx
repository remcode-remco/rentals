import { useEffect, lazy, Suspense } from "react"
import Heading3 from "./shared/Heading3"
import Paragraph from "./shared/Paragraph"
import RentalPrices from "./RentalPrices"
import RentalSpecs from "./RentalSpecs"
import Loading from "./Loading.tsx"

const Image = lazy(() => import('./Image.tsx'))
const ImageGallery = lazy(() => import('./ImageGallery.tsx'))
const RentalCalendar = lazy(() => import('./RentalCalendar'))

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
      <div className="z-50 fixed top-0 left-0 w-full h-full overflow-auto">
        <div className="relative lg:max-w-5xl lg:mt-5 lg:mx-auto lg:rounded lg:shadow-lg lg:shadow-green-800 left-0 right-0 bottom-0 pt-0 lg:pt-0 bg-gray-50">
          <div className=""> 
            <div id="imageDiv" className="lg:order-2 flex justify-center w-full h-full min-h-[50vh] max-h-[80vh] duration-500 ease-in opacity-0">
              <Suspense fallback={<Loading showLoading={false} />}>
                <Image images={rental.pictures} rental_overview={false} />
              </Suspense>
            </div>
            <div id="textDiv" className={`lg:order-1 delay-300 duration-500 ease-in opacity-0`}>
              <Heading3 text={rental.name} />
              <Paragraph text={rental.description} />
              <RentalSpecs rental={rental} />
            </div>
            <div className="lg:w-full xl:max-w-[1600px] xl:mx-auto lg:order-3 lg:col-span-2 md:mx-2">
              <Suspense fallback={<Loading showLoading={false} />}>
                <ImageGallery photos={rental.pictures} targetRowHeight={300} />
              </Suspense>
            </div>
            <div className="bg-gray-50 lg:p-5 lg:order-4 lg:w-full lg:col-span-2 lg:flex lg:justify-center">
              <div className="lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:pb-10">
                <div className="my-3 mx-auto lg:max-w-[700px] lg:ml-5 lg:mr-2 lg:my-0 py-4 px-8 md:text-2xl lg:text-xl">
                  <Heading3 text={text_availability} />
                  <div className="max-w-xl mx-auto md:p-2 md:rounded-xl md:shadow-lg lg:shadow-none">
                    <Suspense fallback={<Loading showLoading={false} />}>
                      <RentalCalendar rental={rental} />
                    </Suspense>
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
      </div>
    )
  }
}

export default Rental