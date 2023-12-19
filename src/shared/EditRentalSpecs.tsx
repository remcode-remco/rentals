import EditInput from "./EditInput"
import IconBath from "./icons/IconBath"
import IconBed from "./icons/IconBed"
import IconPeople from "./icons/IconPeople"
import { TextRentals } from "../Rentals"

const EditRentalSpecs = ({specs,setChanges,index}:{specs:{people:string,beds:string,baths:string},setChanges:(changes:any)=>void,index:number}) => {
  const { people, beds, baths } = specs

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setChanges((prevChanges:TextRentals) => ({
      ...prevChanges,
      rentals: prevChanges.rentals.map((rental, i) =>
        i === index ? { ...rental, [name]: value } : rental
      ),
    }));
  }
  
  return (
    <div className="flex">
      <IconPeople size="20" color="text-green-800" /><EditInput text={people} name={"people"} handleChange={(e=>handleChange(e))} />
      <IconBed size="20" color="text-green-800" /><EditInput text={beds} name={"beds"} handleChange={(e=>handleChange(e))} />
      <IconBath size="20" color="text-green-800" /><EditInput text={baths} name={"baths"} handleChange={(e=>handleChange(e))} />
    </div>
  )
}

export default EditRentalSpecs