import { useContext, useRef } from 'react'
import ImageUpload from '../ImageUpload';
import { AppContext, RentalsContext } from '../App';
import IconImage from './IconImage';

const EditImage = ({section}:{section:number}) => {
  const contextValue = useContext(RentalsContext)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { password, setShowLoading, setMessage } = contextValue as AppContext

  const handleIconClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setShowLoading(true)
      const image:Blob = event.target.files[0]
      ImageUpload({section,image,password}).then((result)=>{
        if (result.status === "success") {
          setShowLoading(false)
          setMessage({error:false,message:"Image Uploaded"})
        } else {
          setShowLoading(false)
          setMessage({error:true,message:"Upload Failed."})
        }
      })
    }
  }

  return (
    <div className='w-full flex items-end justify-end'>
      <IconImage size={'60'} color={'text-black'} handleIconClick={handleIconClick} />
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        className="hidden"
        onChange={(e)=>handleFileChange(e)}
      />
    </div>
  )
}

export default EditImage