import { useState } from "react"
import EditInput from "./EditInput"
import IconBath from "./IconBath"
import IconBed from "./IconBed"
import IconPeople from "./IconPeople"
import { SiteContents } from "../App"

const EditRentalSpecs = ({specs,changes,setChanges,index}:{specs:{people:string,beds:string,baths:string},changes:any,setChanges:(changes:any)=>void,index:number}) => {
  
  const { people, beds, baths } = specs

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setChanges((prevChanges:SiteContents) => {
      const updatedRentals = [...prevChanges.rentals.rentals]
      
      updatedRentals[index] = {
        ...updatedRentals[index],
        [name]: value,
      };
    
      return {
        ...prevChanges,
        rentals: {
          ...prevChanges.rentals,
          rentals: updatedRentals,
        },
      }
    })
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