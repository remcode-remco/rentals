import { useState } from "react"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// interface RentalImage {
//   src:string;
// }

const Image = ({images,rental_overview}:{images:any,rental_overview:boolean}) => {
  const [index, setIndex] = useState(-1)

  if (images) {
    return (
      <>
        <img className={`cursor-pointer object-cover w-full h-full min-h-[25vh] max-h-[50vh] ${rental_overview ? "rounded-t-xl lg:h-[40vh] lg:max-h-screen" : "lg:h-[60vh] lg:max-h-screen xl:h-[80vh]"}`} 
          src={images[0] && images[0].src ? images[0].src : "images/img_placeholder.png"} 
          onClick={() =>{rental_overview ? null : setIndex(0)}}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.src = "images/img_placeholder.png";
          }}
        />

        <Lightbox
          slides={images}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </>
    )
  }
}

export default Image