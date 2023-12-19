import Compressor from 'compressorjs'

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
      url = 'http://localhost:8000/php/upload_hero.php'
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

export const AreaImageUpload = async ({section,image,password}:{section:number,image:Blob,password:string|null|undefined}) => {
  if (password) {
    let url = ''
    if (section === 3) {
      url = 'http://localhost:8000/php/upload_area.php'
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

export default HeroImageUpload