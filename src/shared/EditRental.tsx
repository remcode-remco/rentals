import { useContext, useEffect, useState } from "react"
import { AppContext, RentalsContext, SiteContents } from "../Home"
import IconPencil from "./icons/IconPencil"
import ButtonSave from "./ButtonSave"
import ButtonCancel from "./ButtonCancel"
import { SaveEdit } from "../constants/constants"
import EditInput from "./EditInput"
import EditRentalSpecs from "./EditRentalSpecs"
import { TextRentals } from "../Rentals"
import EditRentalPrices from "./EditRentalPrices"

const EditRental = ({index,section}:{index:number,section:number}) => {
  const contextValue = useContext(RentalsContext)
  const { password, language, setMessage, siteContents, setSiteContents, editingSection, setEditingSection, setShowLoading } = contextValue as AppContext
  const [changes, setChanges] = useState<any>(null)
  const [editingRental,setEditingRental] = useState<number>(-1)

  useEffect(()=>{
    if (siteContents) {
        setChanges(siteContents.rentals)
    }
  },[siteContents,editingSection])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
  
    setChanges((prevChanges:TextRentals) => ({
      ...prevChanges,
      rentals: prevChanges.rentals.map((rental, i) =>
        i === editingRental ? { ...rental, [name]: value } : rental
      ),
    }))

    //@ts-ignore
    setSiteContents((prevSiteContents: SiteContents) => ({
      ...prevSiteContents,
      rentals: {
        ...prevSiteContents.rentals,
        rentals: prevSiteContents.rentals.rentals.map((rental, i) =>
          i === editingRental ? { ...rental, [name]: value } : rental
        ),
      },
    }));
    
    
  }
  
  const handleUpload = () => {
    setShowLoading(true)
    SaveEdit(language,password,section,changes)
    .then((response)=>{
      if (response.status === "success") {
        setMessage({error:false,message:"Saved succesfully!"})
        setShowLoading(false)
        setEditingSection(0)
      } else {
        setMessage({error:true,message:"Error saving data."})
        setShowLoading(false)
      }
    })
  }
  
    return (
      editingRental === -1 ? 
          <div className="absolute right-0 top-0 left-0 bottom-0 opacity-0 hover:opacity-100 hover:bg-green-50/40 rounded-xl hover:shadow-green-50 flex items-center justify-center">
            <IconPencil size={"60"} color={""} onClick={() => setEditingRental(index)} />
          </div>
        : 
          <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-green-50/90 py-5">
            <div className="grid bg-white shadow shadow-green-800 border border-green-800 rounded-xl p-3 max-w-6xl">
              <div className="max-h-[90vh] bg-white overflow-y-auto grid grid-cols-2 gap-3 pb-3">
                <div>
                  <EditInput name="name" text={changes.rentals[editingRental].name} handleChange={handleChange} />
                  <EditInput name="description" text={changes.rentals[editingRental].description} handleChange={handleChange} />
                  <EditInput name="calendar_url" text={changes.rentals[editingRental].calendar_url} handleChange={handleChange} />
                </div>
                <div>
                  <EditRentalSpecs 
                    specs={{  people: changes.rentals[editingRental].people, 
                              beds: changes.rentals[editingRental].beds, 
                              baths: changes.rentals[editingRental].baths }} 
                    setChanges={setChanges} 
                    index={editingRental} 
                  />
                  <EditRentalPrices
                    dates={changes.dates}
                    prices={changes.rentals[editingRental].prices}
                    setChanges={setChanges} 
                    editingRental={editingRental} 
                  />
                </div>
                <div className="col-span-2 flex justify-center gap-4">
                  <ButtonCancel setEditingSection={setEditingRental} />
                  <ButtonSave handleUpload={handleUpload} />
                </div>
              </div>
            </div>
          </div>
    )
}

export default EditRental
