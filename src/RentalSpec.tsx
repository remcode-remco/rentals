import IconBath from "./shared/icons/IconBath"
import IconBed from "./shared/icons/IconBed"
import IconPeople from "./shared/icons/IconPeople"

const RentalSpec = ({spec,specNo}:{spec:string,specNo:number}) => (
  <div className="flex items-center px-5">
    {specNo === 1 ?
      <IconPeople size="20" color="text-green-800" />
    : specNo === 2 ?
      <IconBed size="20" color="text-green-800" />
    :
      <IconBath size="20" color="text-green-800" />
    }
    {spec}
  </div>
)

export default RentalSpec