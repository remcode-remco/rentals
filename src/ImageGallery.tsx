import PhotoAlbum from "react-photo-album"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useEffect, useState } from 'react';

const ImageGallery = ({photos,targetRowHeight}) => {
  const [pictures, setPictures] = useState([])
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (photos) {
      const updateImageDimensions = async () => {
        const updatedPictures = await Promise.all(
          photos.map(async (picture) => {
            const { src } = picture;
            const img = new Image();
            img.src = src;

            return new Promise((resolve) => {
              img.onload = () => {
                const updatedPicture = {
                  ...picture,
                  width: img.width,
                  height: img.height,
                };
                resolve(updatedPicture);
              };
            });
          })
        );

        setPictures(updatedPictures);
      };

      updateImageDimensions();
    }
  }, [photos]);

  if (pictures && pictures.length > 0) {
    return (
      <>
        <PhotoAlbum photos={[...pictures.slice(1)]} layout="rows" targetRowHeight={targetRowHeight} onClick={({ index }) => setIndex(index)} />

          <Lightbox
            slides={pictures}
            open={index >= 0}
            index={index+1}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
    </>
    )
  }
}

export default ImageGallery