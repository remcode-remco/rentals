// import IconBath from "./shared/icons/IconBath"
// import IconBed from "./shared/icons/IconBed"
// import IconPeople from "./shared/icons/IconPeople"
import { Tooltip } from 'react-tooltip'
import { TextRental } from './Rental'

const RentalSpec = ({spec,specNo}:{spec?:string,specNo:number}) => (
  <div className="my-2 flex items-center justify-center">
    <div className="flex flex-col justify-center items-center">
      {/* {specNo === 1 ?
        <IconPeople size="30" color="text-green-800" />
      : specNo === 2 ?
        <IconBed size="30" color="text-green-800" />
      :
        <IconBath size="30" color="text-green-800" />
      } */}
      <Tooltip id="my-tooltip" />
      <div className="text-3xl text-center">
        {spec ? spec : ""}
      </div>      
      {specNo === 1 ?
        "pers"
      : specNo === 2 ?
        "bed"
      :
        "bath"
      }
    </div>
  </div>
)

const RentalSpecs = ({rental}:{rental?:TextRental}) => {

  return (
    <div className="grid grid-cols-3">
      <RentalSpec spec={rental?.people} specNo={1} />
      <RentalSpec spec={rental?.beds} specNo={2} />
      <RentalSpec spec={rental?.baths} specNo={3} />
    </div>
  )
}

export default RentalSpecs