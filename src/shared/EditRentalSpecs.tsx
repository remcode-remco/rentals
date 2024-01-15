import EditInput from "./EditInput"
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
    <div className="grid grid-cols-3 gap-2">
      <div>
        <EditInput text={people} name={"people"} handleChange={(e=>handleChange(e))} />
      </div>
      <div>
        <EditInput text={beds} name={"beds"} handleChange={(e=>handleChange(e))} />
      </div>
      <div>
        <EditInput text={baths} name={"baths"} handleChange={(e=>handleChange(e))} />
      </div>
    </div>
  )
}

export default EditRentalSpecs