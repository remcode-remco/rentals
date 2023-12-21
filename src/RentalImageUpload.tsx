import React, { useContext, useRef } from 'react'
import Compressor from 'compressorjs'
import { RentalsContext, AppContext, SiteContents } from './Home'
import IconPlus from './shared/icons/IconPlus'
import { apiUrl } from './constants/constants'
import { TextRental } from './Rental'

const RentalImageUpload = ({index}:{index:number}) => {
  const contextValue = useContext(RentalsContext)
  const { password, setMessage, siteContents, setSiteContents } = contextValue as AppContext

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  const handleCompressedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && password && siteContents) {
      const image = e.target.files[0]
      new Compressor(image, {
        quality: 0.8,
        width:1080,
        height:1080,
        resize:"cover",
        success: (compressedResult) => {         
          const formData = new FormData()
          formData.append('compressedFile', compressedResult)
          formData.append('filename', image.name)
          formData.append('rentalIndex', index.toString())
          formData.append('password', password)
      
          let url:string = apiUrl + 'upload_image.php'
          fetch(url, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === "success") {
                setMessage({error:false,message:"Upload succesfull"})
                const newRentals: TextRental[] = [...siteContents.rentals.rentals]
                const newPictures: { original: string }[] = [...newRentals[index].pictures, { original: data.message }]
                newRentals[index].pictures = newPictures

                //@ts-ignore
                setSiteContents((prevSiteContents: SiteContents) => ({
                  ...prevSiteContents,
                  rentals: {
                    ...prevSiteContents.rentals,
                    rentals: newRentals,
                  },
                }))
              }
            })
            .catch(error => {
              console.error('Error uploading file:', error)
            })
        },
      })
    }
  }
  
  return (
    <div className='shadow-xl flex items-center justify-center rounded-xl cursor-pointer'>
      <IconPlus size={60} color={'text-black'} handleIconClick={handleIconClick} />
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        className="hidden"
        onChange={(e)=>handleCompressedUpload(e)}
      />
    </div>
  )
}

export default RentalImageUpload