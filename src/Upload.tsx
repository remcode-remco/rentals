import React, {useState} from 'react'
import Compressor from 'compressorjs'

const ImageCompressUpload = () => {
  const [compressedFile, setCompressedFile] = useState<Blob|null>(null);
  
  const handleCompressedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0]
      new Compressor(image, {
        quality: 0.8,
        width:1000,
        height:1200,
        resize:"cover",
        success: (compressedResult) => {   
          setCompressedFile(compressedResult)
        },
      })
    }
  }

  const handleUpload = () => {
    if (compressedFile) {
      const formData = new FormData()
      formData.append('compressedFile', compressedFile)
      
      formData.append('rentalIndex', rentalIndex)
      formData.append('password', password)
  
      fetch('upload_image.php', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error('Error uploading file:', error)
        })
    }
  }  
  
  return (
    <div>
      <input
        accept="image/*"
        type="file"
        onChange={(e) => handleCompressedUpload(e)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ImageCompressUpload