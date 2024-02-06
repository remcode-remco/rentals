import { lazy, useContext } from "react"
import Heading3 from "./shared/Heading3"
import { RentalsContext, AppContext } from "./Home"
import EditRental from "./shared/EditRental"
import RentalSpecs from "./RentalSpecs"
import EditPictures from "./shared/EditPictures"

const Image = lazy(() => import('./Image.tsx'))

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

const RentalOverview = ({index,rental}:{index:number,rental:TextRental,overview:boolean}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-green-600 duration-300 transition-all lg:m-3 px-0 pb-3 lg:my-3 cursor-pointer">
      <div className="relative">
        {password && rental?.pictures && <EditPictures pictures={rental?.pictures} section={3} index={index} />}
        <Image images={rental?.pictures} rental_overview={true} />
      </div>
      <div className="relative">
        <Heading3 text={rental?.name} />
        {password && <EditRental index={index} section={4} />}
        <RentalSpecs overview={true} rental={rental} />
      </div>
    </div>
  )
}

export default RentalOverview