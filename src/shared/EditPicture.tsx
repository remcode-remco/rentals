import { useContext, useState } from "react"
import { AppContext, RentalsContext } from "../Home"
import PictureUpload from "./PictureUpload"
import IconImage from "./icons/IconImage"


const EditPicture = ({section}:{section:number}) => {
  const contextValue = useContext(RentalsContext)
  const { setLockScroll } = contextValue as AppContext

  const [showEditPictures,setShowEditPictures] = useState<boolean>(false)

  return (
    showEditPictures ?
      <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-green-50/90 py-5">
        <div className="grid bg-white shadow shadow-green-800 border border-green-800 rounded-xl p-5 max-w-xl">
          <div className="h-auto bg-white mx-auto m-3 p-3 overflow-y-auto text-black flex flex-wrap gap-4 justify-center">
            <PictureUpload index={0} section={section} />
          </div>
          <div className="flex justify-center">
            <div onClick={()=>{setLockScroll(false);setShowEditPictures(false)}} className="text-xl text-green-800 border border-green-100 z-40 cursor-pointer 
                   px-4 py-2 z-10 rounded shadow shadow-green-800 hover:shadow-green-800 hover:shadow-lg"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    :
      <div className="z-50 absolute left-0 bottom-0 right-0 top-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-green-50/40 rounded-xl hover:shadow-green-50">
        <IconImage size={"50"} onClick={() => {setLockScroll(true);setShowEditPictures(true)}} />
      </div>
  )
}

export default EditPicture