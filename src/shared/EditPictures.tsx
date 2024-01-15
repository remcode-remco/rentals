import { useContext, useState } from "react"
import { AppContext, RentalsContext, SiteContents } from "../Home"
import { DeleteImage } from "../constants/constants"
import IconGarbage from "./icons/IconGarbage"
import PictureUpload from "./PictureUpload"
import IconImage from "./icons/IconImage"

type Pictures = { src: string }[]

const EditPictures = ({pictures,index,section}:{pictures:Pictures,index:number,section:number}) => {
  const contextValue = useContext(RentalsContext)
  const { password, setMessage, setShowLoading, setSiteContents } = contextValue as AppContext

  const [showEditPictures,setShowEditPictures] = useState<boolean>(false)

  const deleteImage = (filename:string) => {
    setShowLoading(true)
    DeleteImage(password,filename)
    .then((response)=>{
      if (response.status === "success") {
        if (section === 2) {
          //@ts-ignore
          setSiteContents((prevSiteContents: SiteContents) => {
            const newPictures = [...prevSiteContents.area.pictures]
            const picturesIndex = newPictures.findIndex((pic) => pic.src === filename)
          
            if (picturesIndex !== -1) {
              newPictures.splice(picturesIndex, 1)
            }
          
            return {
              ...prevSiteContents,
              area: {
                ...prevSiteContents.area,
                pictures: newPictures,
              },
            }
          })

        } else if (section ===3) {
          //@ts-ignore
          setSiteContents((prevSiteContents:SiteContents) => {
            const newRentals = [...prevSiteContents.rentals.rentals];
            const picturesIndex = newRentals[index].pictures.findIndex(
              (pic) => pic.src === filename
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
        }
        setMessage({error:false,message:"Image Deleted"})
        setShowLoading(false)
      } else {
        setMessage({error:true,message:"Error deleting image."})
        setShowLoading(false)
      }
    })
  }

  return (
    showEditPictures ?
      <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-green-50/90 py-5">
        <div className="grid bg-white shadow shadow-green-800 border border-green-800 rounded-xl p-5 max-w-xl">
          <div className="h-auto bg-white mx-auto m-3 p-3 overflow-y-auto text-black flex flex-wrap gap-4 justify-center">
            {pictures.map((pic,picIndex)=>(
              <div key={picIndex} onClick={()=>deleteImage(pic.src)} className="relative w-20 h-20">
                <div className='group absolute flex items-center justify-center z-20 h-full w-full hover:opacity-80 hover:bg-red-300 cursor-pointer'>
                  <div className='hidden group-hover:block p-10 '>
                    <IconGarbage size={20} color={"text-black"} />
                  </div>
                </div>
                <img src={pic.src} className="w-full h-full object-cover"/>
              </div>
            ))}
            <PictureUpload index={index} section={section} />
          </div>
          <div className="flex justify-center">
            <div onClick={()=>setShowEditPictures(false)} className="text-xl text-green-800 border border-green-100 z-40 cursor-pointer 
                   px-4 py-2 z-10 rounded shadow shadow-green-800 hover:shadow-green-800 hover:shadow-lg"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    :
      <div className="z-40 absolute left-0 bottom-0 right-0 top-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-green-50/40 rounded-xl hover:shadow-green-50">
        <IconImage size={"50"} onClick={() => setShowEditPictures(true)} />
      </div>
  )
}

export default EditPictures