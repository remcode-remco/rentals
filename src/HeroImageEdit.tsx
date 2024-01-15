import { useContext, useRef, useState } from 'react'
import { AppContext, RentalsContext } from './Home'
import IconImage from './shared/icons/IconImage'
import { apiUrl } from './constants/constants'

const compressedImage = ({image}:{image:Blob}):Promise<Blob> => {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: 0.8,
      width: 1920,
      resize: 'cover',
      success: (compressedResult) => {
        resolve(compressedResult)
      },
      error: (err) => {
        reject(err)
      },
    })
  })
}

const HeroImageUpload = async ({section,image,password}:{section:number,image:Blob,password:string|null|undefined}) => {
  if (password) {
    let url = ''
    if (section === 2) {
      url = apiUrl + 'upload_hero.php'
    }

    try {
      const compressedImg: Blob = await compressedImage({ image })
      const formData = new FormData()
      formData.append('compressedFile', compressedImg)
      formData.append('password', password)

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error compressing image:', error)
    }
  }
}    

const HeroImageEdit = ({section}:{section:number}) => {
  const contextValue = useContext(RentalsContext)
  
  const [showEditPictures,setShowEditPictures] = useState<boolean>(false)
  
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
      HeroImageUpload({section,image,password}).then((result)=>{
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
      <IconImage size={'60'} onClick={()=>setShowEditPictures(true)} />
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

export default HeroImageEdit