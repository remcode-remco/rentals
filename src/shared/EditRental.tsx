import { useContext, useEffect, useState } from "react"
import { AppContext, RentalsContext, SiteContents } from "../App"
import IconPencil from "./icons/IconPencil"
import SaveButton from "./SaveButton"
import { DeleteImage, SaveEdit } from "../constants/constants"
import IconGarbage from "./icons/IconGarbage"
import RentalImageUpload from "../RentalImageUpload"
import EditInput from "./EditInput"
import EditRentalSpecs from "./EditRentalSpecs"
import { TextRentals } from "../Rentals"
import EditRentalPrices from "./EditRentalPrices"

type Pictures = { original: string }[]

const EditPictures = ({pictures,index}:{pictures:Pictures,index:number}) => {
  const contextValue = useContext(RentalsContext)
  const { password, setMessage, setShowLoading, setSiteContents } = contextValue as AppContext

  const deleteImage = (filename:string) => {
    setShowLoading(true)
    DeleteImage(password,filename)
    .then((response)=>{
      console.log(response)
      if (response.status === "success") {
        //@ts-ignore
        setSiteContents((prevSiteContents:SiteContents) => {
          const newRentals = [...prevSiteContents.rentals.rentals];
          const picturesIndex = newRentals[index].pictures.findIndex(
            (pic) => pic.original === filename
          );
    
          if (picturesIndex !== -1) {
            newRentals[index].pictures.splice(picturesIndex, 1);
          }
    
          return {
            ...prevSiteContents,
            rentals: {
              ...prevSiteContents.rentals,
              rentals: newRentals,
            },
          }
        })
        setMessage({error:false,message:"Image Deleted"})
        setShowLoading(false)
      } else {
        setMessage({error:true,message:"Error deleting image."})
        setShowLoading(false)
      }
    })
  }

  return (
    <div className="flex gap-2 items-center">
      {pictures.map((pic,picIndex)=>(
        <div key={picIndex} onClick={()=>deleteImage(pic.original)} className="relative w-20 h-20 shadow-xl rounded-xl">
          <div className='group absolute flex items-center justify-center z-20 h-full w-full hover:opacity-80 hover:bg-red-300 cursor-pointer'>
            <div className='hidden group-hover:block p-10 '>
              <IconGarbage size={20} color={"text-black"} />
            </div>
          </div>
          <img src={pic.original} className="w-full h-full object-cover"/>
        </div>
      ))}
      <RentalImageUpload index={index} />
    </div>
  )
}

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
    console.log(changes.rentals[1].name)
    SaveEdit(language,password,section,changes)
    .then((response)=>{
      console.log(response)
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
          <div className="absolute right-20 top-20">
            <IconPencil size={"60"} color={""} onClick={() => setEditingRental(index)} />
          </div>
        : 
          <div className="z-40 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-red-300 py-5">
            <div className="h-auto bg-white mx-auto m-3 p-3 shadow-xl md:w-3/6 overflow-y-auto">
              {siteContents && 
                <>
                  <EditInput name="name" text={changes.rentals[editingRental].name} handleChange={handleChange} />
                  <EditRentalPrices
                    dates={changes.dates}
                    prices={changes.rentals[editingRental].prices}
                    setChanges={setChanges} 
                    editingRental={editingRental} 
                  />
                  {/* <EditInput name="description" text={changes.rentals[editingRental].description} handleChange={handleChange} />
                  <EditInput name="calendar_url" text={changes.rentals[editingRental].calendar_url} handleChange={handleChange} /> */}
                  <EditPictures pictures={changes.rentals[editingRental].pictures} index={editingRental} />
                  <EditRentalSpecs 
                    specs={{  people: changes.rentals[editingRental].people, 
                              beds: changes.rentals[editingRental].beds, 
                              baths: changes.rentals[editingRental].baths }} 
                    setChanges={setChanges} 
                    index={editingRental} 
                  />
                </>
              }
              <SaveButton handleUpload={handleUpload} setEditingSection={setEditingRental} />
            </div>
          </div>
    )
}

export default EditRental
