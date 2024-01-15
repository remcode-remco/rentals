import { useContext, useEffect, useState } from "react"
import { AppContext, RentalsContext } from "../Home"

import { SaveEdit } from "../constants/constants"
import ButtonCancel from "./ButtonCancel"
import ButtonSave from "./ButtonSave"
import EditInput from "./EditInput"

type DataStructureType = Record<string, string[]>

const EditFormContainter = ({children}:{children:React.ReactNode}) => {
  return <div className="grid pt-2">{children}</div>
}

const EditForm = () => {
  const contextValue = useContext(RentalsContext)
  const { password, language, setMessage, siteContents, editingSection, setEditingSection, setShowLoading, setSiteContents } = contextValue as AppContext


  const [changes, setChanges] = useState<any>(null)
  const [dataStructure,setDataStructure] = useState<DataStructureType|null>(null)

  useEffect(()=>{
    if (siteContents) {
      if (editingSection === 1) {
        setChanges(siteContents.navigation)
        setDataStructure({
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
          text: ["rentals", "text"],
        })
      } else if (editingSection === 5) {
        setChanges(siteContents.contact)
        setDataStructure({  
        title: ["contact", "title"],
        text: ["contact", "text"],
        owner: ["contact", "owner"],
        email: ["contact", "email"],
        phone: ["contact", "phone"],
        facebook: ["contact", "facebook"],
        instagram: ["contact", "instagram"],
        twitter: ["contact", "twitter"],
        address: ["contact", "address"],
        message: ["contact", "message"],
        googlemaps: ["contact", "googlemaps"],
        locate_us: ["contact", "locate_us"],
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
        if (editingSection === 1) {
          //@ts-ignore
          setSiteContents((prevSiteContents: SiteContents) => ({
            ...prevSiteContents,
            navigation: changes,
          }))
        } else if (editingSection === 2) {
          //@ts-ignore
          setSiteContents((prevSiteContents: SiteContents) => ({
            ...prevSiteContents,
            hero: changes,
          }))
        } else if (editingSection === 3) {
          //@ts-ignore
          setSiteContents((prevSiteContents: SiteContents) => ({
            ...prevSiteContents,
            area: changes,
          }))
        } else if (editingSection === 4) {
          //@ts-ignore
          setSiteContents((prevSiteContents: SiteContents) => ({
            ...prevSiteContents,
            rentals: changes,
          }))
        } else if (editingSection === 5) {
          //@ts-ignore
          setSiteContents((prevSiteContents: SiteContents) => ({
            ...prevSiteContents,
            contact: changes,
          }))
        } 
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
    <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-green-50/90 py-5">
      <div className="bg-white shadow shadow-green-800 border border-green-800 rounded-xl w-10/12 flex">
        <div className="w-full max-h-[90vh] bg-white rounded-xl overflow-y-auto p-3 grid">
          {siteContents && dataStructure &&
            <EditFormContainter>
              {Object.keys(dataStructure).map((fieldName) => (
                <EditInput
                  key={fieldName}
                  text={getNestedValue(siteContents, dataStructure[fieldName])}
                  name={fieldName}
                  handleChange={handleChange}
                />
              ))}
            </EditFormContainter>
          }
          <div className="flex justify-center gap-4 py-2">
            <ButtonCancel setEditingSection={setEditingSection} />
            <ButtonSave handleUpload={handleUpload} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditForm