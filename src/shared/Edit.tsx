import { useContext, useEffect, useState } from "react"
import { AppContext, RentalsContext } from "../App"
import IconPencil from "./IconPencil"
import SaveButton from "./SaveButton"
import { SaveEdit } from "../constants/constants"

type DataStructureType = Record<string, string[]>

const EditForm = ({children}:{children:React.ReactNode}) => {
  return <div className="grid">{children}</div>
}

const EditFormInput = ({text,name,handleChange}:{text:string,name:string,handleChange:(e:any)=>void}) => (
  <>
    <label>{name}</label>
    {name === "text" ?
      <textarea onChange={(e=>handleChange(e))} rows={10} name={name} defaultValue={text} className="border shadow w-full lg:mt-4 text-gray-600" />
    :
      <input onChange={(e) => handleChange(e)} name={name} defaultValue={text} className="my-2 p-1 border shadow" />
    }
  </>
)

const Edit = ({section}:{section:number}) => {
  const contextValue = useContext(RentalsContext)
  const { password, language, setMessage, siteContents, editingSection, setEditingSection, setShowLoading } = contextValue as AppContext
  const [changes, setChanges] = useState<any>(null)
  const [dataStructure,setDataStructure] = useState<DataStructureType|null>(null)

  useEffect(()=>{
    if (siteContents) {
      if (editingSection === 1) {
        setChanges(siteContents.navigation)
        setDataStructure({
          title: ["navigation", "title"],
          home: ["navigation", "home"],
          area: ["navigation", "area"],
          rentals: ["navigation", "rentals"],
          contact: ["navigation", "contact"],
        })
      } else if (editingSection === 2) {
        setChanges(siteContents.hero)
        setDataStructure({
          title: ["hero", "title"],
          subtitle: ["hero", "subtitle"]
        })
      } else if (editingSection === 3) {
        setChanges(siteContents.area)
        setDataStructure({
          title: ["area", "title"],
          text: ["area", "text"],
        })
      } else if (editingSection === 4) {
        setChanges(siteContents.rentals)
        setDataStructure({
          title: ["rentals", "title"],
          subtitle: ["rentals", "subtitle"],
          name: ["rentals", "rentals", "name"],
          description: ["rentals", "rentals", "description"],
          pictureOriginal: ["rentals", "rentals", "pictures", "original"],
          specs: ["rentals", "rentals", "specs"],
          calendarUrl: ["rentals", "rentals", "calendar_url"],
          videosEmbedUrl: ["rentals", "rentals", "videos", "embedUrl"],
          prices: ["rentals", "rentals", "prices"],
        })
      } else if (editingSection === 5) {
        setChanges(siteContents.contact)
        setDataStructure({  
        title: ["contact", "title"],
        text: ["contact", "text"],
        email: ["contact", "email"],
        phone: ["contact", "phone"],
        address: ["contact", "address"],
        })
      } else {
        setDataStructure(null)
        setChanges(null)
      }
    }
  },[siteContents,editingSection])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setChanges({
      ...changes,
      [name]: value,
    })
  }

  const handleUpload = () => {
    setShowLoading(true)
    SaveEdit(language,password,editingSection,changes)
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

  const getNestedValue = (obj: any, path: any[]) => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
  }  

    return (
        editingSection === 0 || editingSection !== section ? 
          <div className="z-30 absolute -translate-y-full w-full h-full bottom-0 flex items-end justify-end">
            <IconPencil size={"60"} color={""} onClick={() => setEditingSection(section)} />
          </div>
        : 
          <div className="z-40 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-red-300">
            <div className="bg-white mx-auto p-3 shadow-xl md:w-3/6">
              {siteContents && dataStructure &&
                <EditForm>
                  {Object.keys(dataStructure).map((fieldName) => (
                    <EditFormInput
                      key={fieldName}
                      text={getNestedValue(siteContents, dataStructure[fieldName])}
                      name={fieldName}
                      handleChange={handleChange}
                    />
                  ))}
                </EditForm>
              }
              <SaveButton handleUpload={handleUpload} setEditingSection={setEditingSection} />
            </div>
          </div>
    )
}

export default Edit
