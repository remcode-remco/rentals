import { useContext } from "react"
import Heading3 from "./shared/Heading3"
import Image from "./Image"
import { RentalsContext, AppContext } from "./Home"
import EditRental from "./shared/EditRental"
import RentalSpecs from "./RentalSpecs"

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
    <div className="relative bg-white rounded-xl shadow-lg hover:shadow-green-600 lg:m-3 px-0 pb-3 lg:my-3 cursor-pointer">
      <Image images={rental?.pictures} clickable={true} />
      <Heading3 text={rental?.name} />
      {password && <EditRental index={index} section={4} />}
      <RentalSpecs rental={rental} />
    </div>
  )
}

export default RentalOverview