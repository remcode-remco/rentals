import { lazy, useEffect, useState } from 'react'
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Lightbox from "yet-another-react-lightbox"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

const PhotoAlbum = lazy(() => import('react-photo-album'))
// const Lightbox = lazy(() => import('yet-another-react-lightbox'))

interface Photo {
  src: string;
  width?: number;
  height?: number;
}

interface Photos extends Array<Photo> {}

interface PhotoToAlbum {
  src: string;
  width: number;
  height: number;
}

interface PhotosToAlbum extends Array<PhotoToAlbum> {}

const ImageGallery = ({photos,targetRowHeight}:{photos?:Photos,targetRowHeight:number}) => {
  const [photosToAlbum, setPhotosToAlbum] = useState<PhotosToAlbum>([])
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    if (photos) {
      const updateImageDimensions = async () => {
        const updatedPictures:PhotosToAlbum = await Promise.all<PhotoToAlbum>(
          photos.map(async (picture) => {
            const { src } = picture
            const img = new Image()
            img.src = src

            return new Promise((resolve) => {
              img.onload = () => {
                const updatedPicture = {
                  ...picture,
                  width: img.width,
                  height: img.height,
                }
                resolve(updatedPicture)
              }
            })
          })
        )
        setPhotosToAlbum(updatedPictures)
      }

      updateImageDimensions()
    }
  }, [photos])  

  if (photosToAlbum && photosToAlbum.length > 0) {
    return (
      <>
        <PhotoAlbum photos={[...photosToAlbum.slice(1)]} layout="rows" targetRowHeight={targetRowHeight} onClick={({ index }) => setIndex(index)} />

        <Lightbox
          slides={photosToAlbum}
          open={index >= 0}
          index={index+1}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </>
    )
  }
}

export default ImageGallery