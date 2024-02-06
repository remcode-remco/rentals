// import { Tooltip } from 'react-tooltip'
import { TextRental } from './Rental'
import { FaBed, FaBath } from 'react-icons/fa'
import { IoMdPerson } from "react-icons/io"
import { IconContext } from "react-icons"

const RentalSpec = ({spec,specNo,overview}:{spec?:string,specNo:number,overview:boolean}) => (
  <div className={`flex flex-col justify-end items-center text-gray-700 mb-3 md:py-2 border-2 border-gray-200 md:my-2 rounded-xl shadow ${overview ? "py-1 px-2 md:py-3 md:px-5" : "py-3 px-5"} `}>
    <div className="mb-3 lg:mb-0 text-2xl lg:text-2xl">
      {spec ? spec : ""}
    </div>
    <IconContext.Provider value={{ color: "text-gray-800", className: "text-2xl lg:text-2xl" }}>
        {specNo === 1 ?
          <IoMdPerson />
        : specNo === 2 ?
          <FaBed />
        :
          <FaBath />
        }
        {/* <Tooltip id="my-tooltip" /> */}
    </IconContext.Provider>
  </div>
)

const RentalSpecs = ({rental,overview}:{rental?:TextRental,overview:boolean}) => (
  <div className={`h-full lg:h-auto grid grid-cols-3 lg:flex ${overview ? "mx-2 gap-2" : "lg:flex-col gap-3 mx-auto"} max-w-xs lg:px-10 lg:py-3`}>
    <RentalSpec overview={overview} spec={rental?.people} specNo={1} />
    <RentalSpec overview={overview} spec={rental?.beds} specNo={2} />
    <RentalSpec overview={overview} spec={rental?.baths} specNo={3} />
  </div>
)

export default RentalSpecs