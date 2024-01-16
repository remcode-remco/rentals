import React, { useContext, useRef } from 'react'
import Compressor from 'compressorjs'
import { RentalsContext, AppContext, SiteContents } from '../Home'
import IconPlus from './icons/IconPlus'
import { apiUrl } from '../constants/constants'
import { TextRental } from '../Rental'

interface CompressorSettings {
  quality: number;
  width: number;
  height: number;
}

const PictureUpload = ({section,index}:{section:number,index:number}) => {
  const contextValue = useContext(RentalsContext)
  const { password, setMessage, siteContents, setSiteContents, setShowLoading } = contextValue as AppContext

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  const handleCompressedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && password && siteContents) {
      setShowLoading(true)
      const image = e.target.files[0]

      let compressor_settings:CompressorSettings = 
              section === 1 ? { quality: 0.8, width: 1080, height: 1080 }
            :
              section === 2 ? { quality: 0.8, width: 1080, height: 1080 }
            :
              section === 3 ? { quality: 0.8, width: 1080, height: 1080 }
            :
              section === 4 ? { quality: 0.8, width: 1080, height: 1080 }
            : 
              { quality: 0.8, width: 1080, height: 1080 }

      new Compressor(image, {
        quality: compressor_settings.quality,
        width: compressor_settings.width,
        height: compressor_settings.height,
        resize: "cover",
        success: (compressedResult) => {         
          const formData = new FormData()
          formData.append('compressedFile', compressedResult)
          formData.append('filename', image.name)
          formData.append('rentalIndex', index.toString())
          formData.append('section', section.toString())
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
                
                if (section === 2) {
                  const newPictures = [...siteContents.area.pictures, { src: data.message }]

                  //@ts-ignore
                  setSiteContents((prevSiteContents: SiteContents) => ({
                    ...prevSiteContents,
                    area: {
                      ...prevSiteContents.area,
                      pictures: newPictures,
                    },
                  }));

        
                } else if (section ===3) {
                  const newRentals: TextRental[] = [...siteContents.rentals.rentals]
                  const newPictures: { src: string }[] = [...newRentals[index].pictures, { src: data.message }]
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
              }
              setShowLoading(false)
            })
            .catch(error => {
              console.error('Error uploading file:', error)
              setShowLoading(false)
            })
        },
      })
    }
  }
  
  return (
    <div className='shadow border border-green-800 hover:shadow-green-800 flex items-center justify-center rounded cursor-pointer'>
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

export default PictureUpload