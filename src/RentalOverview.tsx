import { useContext } from "react"
import Heading3 from "./shared/Heading3"
import Image from "./Image"
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

const RentalOverview = ({index,rental}:{index:number,rental:TextRental,overview:boolean}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

  return (
    <div className="relative rounded shadow-lg lg:m-3 px-2 py-3 bg-white">
      <Image image={rental?.pictures[0]} />
      <Heading3 text={rental?.name} />
      {password && <EditRental index={index} section={4} />}
      <RentalSpecs rental={rental} />
    </div>
  )
}

export default RentalOverview