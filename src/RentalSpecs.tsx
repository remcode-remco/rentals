// import { Tooltip } from 'react-tooltip'
import { TextRental } from './Rental'
import { FaBed, FaBath } from 'react-icons/fa'
import { IoMdPerson } from "react-icons/io"
import { IconContext } from "react-icons"

const RentalSpec = ({spec,specNo}:{spec?:string,specNo:number}) => (
  <div className="flex flex-col justify-end items-center text-gray-700 mb-5 lg:mb-0 md:py-2">
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

const RentalSpecs = ({rental}:{rental?:TextRental}) => (
  <div className="h-full lg:h-auto grid grid-cols-3 max-w-xs mx-auto">
    <RentalSpec spec={rental?.people} specNo={1} />
    <RentalSpec spec={rental?.beds} specNo={2} />
    <RentalSpec spec={rental?.baths} specNo={3} />
  </div>
)

export default RentalSpecs