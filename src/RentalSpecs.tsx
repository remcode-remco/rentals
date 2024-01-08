// import { Tooltip } from 'react-tooltip'
import { TextRental } from './Rental'
import { FaBed, FaBath } from 'react-icons/fa'
import { IoMdPerson } from "react-icons/io"

const RentalSpec = ({spec,specNo}:{spec?:string,specNo:number}) => (
  <div className="flex flex-col justify-end items-center text-gray-700">
    <div className="text-2xl">
      {spec ? spec : ""}
    </div>
    <div className=''>
      {specNo === 1 ?
        <IoMdPerson size="25" />
      : specNo === 2 ?
        <FaBed size="25" />
      :
        <FaBath size="25" />
      }
      {/* <Tooltip id="my-tooltip" /> */}
    </div>
  </div>
)

const RentalSpecs = ({rental}:{rental?:TextRental}) => (
  <div className="grid grid-cols-3">
    <RentalSpec spec={rental?.people} specNo={1} />
    <RentalSpec spec={rental?.beds} specNo={2} />
    <RentalSpec spec={rental?.baths} specNo={3} />
  </div>
)

export default RentalSpecs