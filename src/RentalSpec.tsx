import IconBath from "./shared/IconBath"
import IconBed from "./shared/IconBed"
import IconPeople from "./shared/IconPeople"


const RentalSpec = ({spec,index}:{spec:number,index:number}) => (
  <div className="flex items-center px-5">
    {index === 0 ?
      <IconPeople size="20" color="text-green-800" />
    : index === 1 ?
      <IconBed size="20" color="text-green-800" />
    :
      <IconBath size="20" color="text-green-800" />
    }
    {spec.toString()}
  </div>
)

export default RentalSpec